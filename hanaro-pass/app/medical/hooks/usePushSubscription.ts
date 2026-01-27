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
    if (result === 'success' || result === 'error' || result === 'aborted') {
      router.push(targetUrl);
    } else if (result === 'denied') {
      alert('알림을 허용하셔야 실시간 심사 결과를 받아보실 수 있습니다.');
    } else if (result === 'default') {
      alert(
        '알림 권한을 결정하지 않으셨습니다. 승인 알림을 받으시려면 허용이 필요합니다.',
      );
      console.info('[Push] 사용자가 권한 요청 프롬프트를 닫았습니다.');
    }
  };

  return { handleSubscribe };
}
