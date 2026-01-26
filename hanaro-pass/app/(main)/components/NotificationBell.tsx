'use client';

import Image from 'next/image';
import { usePushSubscription } from '@/app/medical/hooks/usePushSubscription';

export default function NotificationBell() {
  const { handleSubscribe } = usePushSubscription();

  return (
    <button
      onClick={() => handleSubscribe()}
      className="transition-transform active:scale-90"
    >
      <Image width={20} height={20} src="/images/main/bell.svg" alt="알림" />
    </button>
  );
}
