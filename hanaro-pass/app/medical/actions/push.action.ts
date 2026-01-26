'use server';

import webpush, { type PushSubscription } from 'web-push';
import { type ActionResult, handleActionResult } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

// VAPID 설정
const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (PUBLIC_KEY && PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
    PUBLIC_KEY,
    PRIVATE_KEY,
  );
}

// QQQ : userId로 세션 가져오기
export async function saveSubscriptionAction(
  subJson: string,
): Promise<ActionResult<void>> {
  try {
    const session = await getSession();
    const userId = session.userId;

    if (!userId) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
        status: 401,
      };
    }
    const subscription: PushSubscription = JSON.parse(subJson);

    await prisma.user.update({
      where: { id: userId },
      data: {
        pushSubscription: subscription as unknown as any,
      },
    });

    return { success: true, data: undefined };
  } catch (error) {
    console.error('[SaveSubscription Error]:', error);
    return handleActionResult(error);
  }
}

/**
 * 2. 알림 발송
 */
export async function triggerPushNotification(
  userId: number,
  title: string,
  body: string,
  url: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushSubscription: true },
    });

    if (!user?.pushSubscription) return;

    const sub = user.pushSubscription as unknown as PushSubscription;

    await webpush.sendNotification(sub, JSON.stringify({ title, body, url }));

    // 알림 내역 DB 기록
    await prisma.notification.create({
      data: { userId, title, content: body, link: url },
    });
  } catch (error) {
    console.error('[Push Send Error]:', error);
  }
}
