'use client';

import { useRouter } from 'next/navigation';
import { subscribeUser } from '@/lib/pushUtil';

export function usePushSubscription() {
  const router = useRouter();

  const handleSubscribe = async (
    targetUrl: string = '/medical/notifications',
  ) => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      console.warn('[Push] 알림 미지원 브라우저');
      router.push(targetUrl);
      return;
    }

    if (Notification.permission === 'denied') {
      alert('알림이 차단되어 있습니다. 설정에서 권한을 허용해 주세요!');
      return;
    }

    const result = await subscribeUser();
    if (result === 'success' || result === 'error') {
      router.push(targetUrl);
    } else if (result === 'denied') {
      alert('알림을 허용하셔야 실시간 결과를 받아보실 수 있습니다.');
    }
  };

  return { handleSubscribe };
}
