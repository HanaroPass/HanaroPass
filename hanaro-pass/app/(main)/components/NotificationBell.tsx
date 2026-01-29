'use client';

import Image from 'next/image';
import { usePushSubscription } from '@/app/medical/hooks/usePushSubscription';

export default function NotificationBell() {
  const { handleSubscribe } = usePushSubscription();

  return (
    <button
      type="button"
      onClick={() => handleSubscribe()}
      className="transition-transform active:scale-90"
      aria-label="알림 구독하기"
    >
      <Image width={20} height={20} src="/images/main/bell.svg" alt="알림" />
    </button>
  );
}
