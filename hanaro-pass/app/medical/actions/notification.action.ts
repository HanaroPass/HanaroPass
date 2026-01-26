// app/medical/actions/notification.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { type ActionResult, handleActionResult } from '@/lib/errorHandler';
import type { Notification } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function getNotificationsAction(): Promise<
  ActionResult<Notification[]>
> {
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

/**
 * [알림 읽음 처리]
 */
export async function markAsReadAction(
  id: number,
): Promise<ActionResult<null>> {
  try {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    revalidatePath('/medical/notifications');
    return { success: true, data: null };
  } catch (error) {
    return handleActionResult(error);
  }
}
