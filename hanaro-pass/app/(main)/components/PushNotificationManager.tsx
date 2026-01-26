'use client';

import { useEffect } from 'react';
import { subscribeUser } from '@/lib/pushUtil';

type PushNotificationManagerProps = {
  isLoggedIn: boolean;
};

export default function PushNotificationManager({
  isLoggedIn,
}: PushNotificationManagerProps) {
  useEffect(() => {
    if (!isLoggedIn || !('serviceWorker' in navigator)) return;

    const silentSync = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');

        if (Notification.permission === 'granted') {
          await subscribeUser();
          console.log('[Push] 구독 정보가 성공적으로 동기화되었습니다.');
        }
      } catch (error) {
        console.error('[Push Manager] 동기화 실패:', error);
      }
    };

    silentSync();
  }, [isLoggedIn]);

  return null;
}
