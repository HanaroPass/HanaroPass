'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Notification } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';

type NotificationCardProps = {
  notification: Notification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 승인/반려 여부에 따른 아이콘 설정
  const isApproved = notification.content.includes('승인');
  const statusIcon = isApproved ? '✨' : '📝';

  const handleCardClick = () => {
    // link가 존재할 때만 이동하며, 없을 경우 클릭 동작을 무시합니다.
    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={notification.link ? handleCardClick : undefined}
      className={cn(
        'h-auto w-full justify-between rounded-xl border-2 p-4 transition-all',
        !notification.link && 'cursor-default opacity-80',
        notification.isRead
          ? 'border-gray-100 bg-white opacity-70'
          : 'border-green-ez/30 bg-green-50/30 shadow-sm',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {statusIcon}
        </span>
        <div className="text-left">
          <p className="font-sans font-semibold text-base text-primary">
            {notification.title}
          </p>
          <p className="line-clamp-2 font-sans text-muted-foreground text-sm">
            {notification.content}
          </p>
          <p className="mt-1 font-sans text-[10px] text-gray-400">
            {mounted ? new Date(notification.createdAt).toLocaleString() : ''}
          </p>
        </div>
      </div>

      {!notification.isRead && (
        <div className="flex h-2 w-2 shrink-0 rounded-full bg-green-ez" />
      )}
    </Button>
  );
}
