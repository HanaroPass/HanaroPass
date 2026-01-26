'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Notification } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';
import { markAsReadAction } from '../../actions/notification.action';

type NotificationCardProps = {
  notification: Notification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isRead, setIsRead] = useState(notification.isRead);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 승인/반려 여부에 따른 아이콘 설정
  const isApproved = notification.content.includes('승인');
  const statusIcon = isApproved ? '✨' : '📝';

  const handleCardClick = async () => {
    if (!isRead) {
      setIsRead(true);
      const result = await markAsReadAction(notification.id);

      if (!result.success) {
        console.error(`[읽음 처리 실패]: ${result.message}`);
        setIsRead(false);
        return;
      }
    }

    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleCardClick}
      className={cn(
        'h-auto w-full justify-between overflow-hidden rounded-xl border-2 p-4 transition-all',
        !notification.link && 'cursor-default opacity-80',
        isRead
          ? 'border-gray-100 bg-white opacity-70'
          : 'border-green-ez/30 bg-green-50/30 shadow-sm',
      )}
    >
      <div className="flex w-full min-w-0 items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {statusIcon}
        </span>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate font-sans font-semibold text-base text-primary">
            {notification.title}
          </p>
          <p className="line-clamp-2 whitespace-pre-wrap break-words font-sans text-muted-foreground text-sm">
            {notification.content}
          </p>
          <p className="mt-1 font-sans text-[10px] text-gray-400">
            {mounted ? new Date(notification.createdAt).toLocaleString() : ''}
          </p>
        </div>
      </div>

      {!isRead && (
        <div className="ml-2 h-2.5 w-2.5 shrink-0 rounded-full bg-green-ez shadow-[0_0_8px_rgba(50,200,100,0.5)]" />
      )}
    </Button>
  );
}
