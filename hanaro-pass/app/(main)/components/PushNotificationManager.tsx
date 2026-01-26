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
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey), // '!' 제거
          });
          await saveSubscriptionAction(JSON.stringify(sub));
        }
      } catch (error) {
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
