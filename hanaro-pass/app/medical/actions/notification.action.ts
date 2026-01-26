// app/medical/actions/notification.action.ts
'use server';

import { type ActionResult, handleActionResult } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function getNotificationsAction(): Promise<ActionResult<any[]>> {
  try {
    const session = await getSession();
    if (!session.userId) throw new Error('인증이 필요합니다.');

    const notifications = await prisma.notification.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' }, // 최신순 정렬
    });

    return { success: true, data: notifications };
  } catch (error) {
    return handleActionResult(error);
  }
}
