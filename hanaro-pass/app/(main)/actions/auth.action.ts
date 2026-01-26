'use server';

import { revalidatePath } from 'next/cache';
import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { saveUserIdToSession } from '@/lib/session'; // 세션 유틸리티

/**
 * 특정 역할을 가진 유저로 강제 세션 주입
 */
export async function forceLoginAction(
  role: 'USER' | 'ADMIN',
): Promise<ActionResult<{ nickname: string }>> {
  try {
    const user = await prisma.user.findFirst({
      where: { role },
      select: { id: true, nickname: true },
    });

    if (!user) {
      throw new HttpError(`${role} 권한을 가진 유저가 DB에 없습니다.`, 404);
    }

    await saveUserIdToSession(user.id);

    revalidatePath('/');

    return { success: true, data: { nickname: user.nickname } };
  } catch (error) {
    return handleActionResult(error);
  }
}
