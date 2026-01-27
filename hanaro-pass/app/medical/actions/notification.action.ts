// app/medical/actions/notification.action.ts
'use server';

import { revalidatePath } from 'next/cache';
import { type ActionResult, handleActionResult } from '@/lib/errorHandler';
import type { Notification } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import { validateUser } from '@/lib/user';

/**
 * 알림 목록 조회
 * @param page 현재 페이지 번호 (0부터 시작)
 * @param limit 한 번에 불러올 알림 개수
 * @returns
 */
export async function getNotificationsAction(
  page: number = 1,
): Promise<ActionResult<Notification[]>> {
  const limit = 10;
  try {
    const userId = await validateUser();

    const notifications = await prisma.notification.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }, // 최신순 정렬
      skip: (page - 1) * limit, // 건너뛸 개수
      take: limit, // 가져올 개수
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
    const userId = await validateUser();
    await prisma.notification.update({
      where: { id, userId },
      data: { isRead: true },
    });

    revalidatePath('/medical/notifications');
    return { success: true, data: null };
  } catch (error) {
    return handleActionResult(error);
  }
}

/**
 * [모든 알림 읽음 처리]
 */
export async function markAllAsReadAction(): Promise<ActionResult<null>> {
  try {
    const userId = await validateUser();
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    revalidatePath('/medical/notifications');
    return { success: true, data: null };
  } catch (error) {
    return handleActionResult(error);
  }
}

/**
 * [알림 삭제]
 */
export async function deleteNotificationAction(
  id: number,
): Promise<ActionResult<null>> {
  try {
    const userId = await validateUser();
    await prisma.notification.delete({
      where: { id, userId },
    });

    revalidatePath('/medical/notifications');
    return { success: true, data: null };
  } catch (error) {
    return handleActionResult(error);
  }
}

/**
 * [모든 알림 삭제]
 */
export async function deleteAllNotificationsAction(): Promise<
  ActionResult<null>
> {
  try {
    const userId = await validateUser();

    await prisma.notification.deleteMany({
      where: { userId: userId },
    });

    revalidatePath('/medical/notifications');

    return { success: true, data: null };
  } catch (error) {
    return handleActionResult(error);
  }
}
