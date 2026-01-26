'use server';

import webpush, { type PushSubscription } from 'web-push';
import { type ActionResult, handleActionResult } from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { validateUser } from '@/lib/user';

// VAPID 설정
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

const isVapidConfigured = !!(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY);

if (isVapidConfigured) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@example.com',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
  );
} else {
  console.warn(
    '[Push] VAPID 환경 변수가 설정되지 않았습니다. 푸시 알림 기능이 비활성화됩니다.',
  );
}

export async function saveSubscriptionAction(
  subJson: string,
): Promise<ActionResult<void>> {
  try {
    const userId = await validateUser();
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
  if (!isVapidConfigured) {
    console.warn('[Push] VAPID 미설정으로 알림 전송을 스킵합니다.');
    return;
  }

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
