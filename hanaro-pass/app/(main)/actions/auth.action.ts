'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { saveUserIdToSession } from '@/lib/session'; // 세션 유틸리티

/**
 * 특정 역할을 가진 유저로 강제 세션 주입
 */
export async function forceLoginAction(
  role: 'USER' | 'ADMIN',
): Promise<ActionResult<{ nickname: string }>> {
  const isDev = process.env.NODE_ENV === 'development';
  const isForceEnabled = process.env.FORCE_LOGIN_ENABLED === 'true';

  if (!isDev && !isForceEnabled) {
    throw new HttpError(
      'Forbidden: 이 기능은 개발 모드에서만 사용할 수 있습니다.',
      403,
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: { role },
      select: { id: true, nickname: true },
    });

    if (!user) {
      throw new HttpError(`${role} 권한을 가진 유저가 DB에 없습니다.`, 404);
    }

    await saveUserIdToSession(user.id);
    revalidatePath('/', 'layout');
  } catch (error) {
    return handleActionResult(error);
  }

  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete('user_secure_session');

  redirect('/');
}
