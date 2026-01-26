'use client';

import { useEffect } from 'react';
import { saveSubscriptionAction } from '@/app/medical/actions/push.action';

export default function PushNotificationManager({
  userId,
}: {
  userId: number | null;
}) {
  useEffect(() => {
    if (!userId || !('serviceWorker' in navigator)) return;

    const initPush = async () => {
      const reg = await navigator.serviceWorker.register('/sw.js');
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
          ),
        });
        await saveSubscriptionAction(JSON.stringify(sub));
      }
    };
    initPush();
  }, [userId]);

  return null;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
