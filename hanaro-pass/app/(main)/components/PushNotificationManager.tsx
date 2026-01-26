'use client';

import { useEffect } from 'react';
import { saveSubscriptionAction } from '@/app/medical/actions/push.action';

export default function PushNotificationManager({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  useEffect(() => {
    const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    if (!isLoggedIn || !('serviceWorker' in navigator) || !publicVapidKey) {
      return;
    }

    const initPush = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');

        // 이미 구독중인지 확인
        const existingSub = await reg.pushManager.getSubscription();
        if (existingSub) {
          console.log('[Push] 이미 구독 정보가 존재합니다.');
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('[Push] 알림 권한이 거부되었습니다.');
          return;
        }

        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        const result = await saveSubscriptionAction(JSON.stringify(sub));

        if (!result.success) {
          console.error(`[Push Error ${result.status}]: ${result.message}`);
          return;
        }

        console.log('[Push] 알림 서비스 구독 성공! ✨');
      } catch (error) {
        // QQQ : 설정을 안하면 다시 설정할 수 있도록
        console.error('푸시 구독 설정 실패:', error);
      }
    };

    initPush();
  }, [isLoggedIn]);

  return null;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
