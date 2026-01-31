'use client';

import { useRouter } from 'next/navigation';
import { subscribeUser } from '@/lib/pushUtil';
import { useAlert } from '@/providers/alertProvider';

export function usePushSubscription() {
  const router = useRouter();
  const { alert } = useAlert();

  const handleSubscribe = async (
    targetUrl: string = '/medical/notifications',
  ) => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      console.warn('[Push] 알림 미지원 브라우저');
      router.push(targetUrl);
      return;
    }

    if (Notification.permission === 'denied') {
      alert({
        title: '알림 권한 필요',
        description:
          '알림이 차단되어 있습니다.\n브라우저 설정에서 권한을 허용해 주세요!',
        actionLabel: '확인',
        variant: 'destructive',
      });
      return;
    }

    const result = await subscribeUser();
    if (result === 'success' || result === 'error' || result === 'aborted') {
      router.push(targetUrl);
    } else if (result === 'denied') {
      alert({
        title: '알림 수신 거부',
        description:
          '알림을 허용하셔야 심사 결과를\n빠르게 받아보실 수 있습니다.',
        actionLabel: '확인',
        variant: 'destructive',
      });
    } else if (result === 'default') {
      alert({
        title: '알림 설정 미완료',
        description:
          '알림 권한을 결정하지 않으셨습니다.\n승인 알림을 받으시려면 허용이 필요합니다.',
        actionLabel: '다시 시도',
      });
      console.info('[Push] 사용자가 권한 요청 프롬프트를 닫았습니다.');
    }
  };

  return { handleSubscribe };
}
