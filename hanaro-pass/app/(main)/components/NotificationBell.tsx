'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { subscribeUser } from '@/lib/pushUtil';

export default function NotificationBell() {
  const router = useRouter();

  const handleBellClick = async () => {
    const isNotificationSupported =
      typeof window !== 'undefined' && 'Notification' in window;

    if (!isNotificationSupported) {
      console.warn('[Push] 이 브라우저는 알림 기능을 지원하지 않습니다.');
      router.push('/medical/notifications');
      return;
    }

    const currentPermission = Notification.permission;

    if (currentPermission === 'denied') {
      alert(
        '현재 알림이 차단되어 있습니다.\n주소창 왼쪽의 [자물쇠] 아이콘을 눌러 [알림] 권한을 다시 허용해 주세요! ',
      );
      return;
    }
    const result = await subscribeUser();

    if (result === 'success') {
      router.push('/medical/notifications');
    } else if (result === 'denied') {
      alert('알림을 허용하셔야 실시간 심사 결과를 받아보실 수 있습니다.');
    } else if (result === 'error') {
      router.push('/medical/notifications');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBellClick}
      className="transition-transform active:scale-90"
      aria-label="알림 설정 업데이트"
    >
      <Image
        width={20}
        height={20}
        src="/images/main/bell.svg"
        alt="알림 아이콘"
      />
    </button>
  );
}
