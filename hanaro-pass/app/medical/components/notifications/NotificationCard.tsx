'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NotificationCardProps = {
  notification: {
    id: number;
    title: string;
    content: string;
    link: string;
    createdAt: Date;
    isRead: boolean;
  };
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const router = useRouter();

  // 승인/반려 여부에 따른 아이콘 설정
  const isApproved = notification.content.includes('승인');
  const statusIcon = isApproved ? '✨' : '📝';

  return (
    <Button
      variant="outline"
      onClick={() => router.push(notification.link)}
      className={cn(
        'h-auto w-full justify-between rounded-xl border-2 p-4 transition-all',
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
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {!notification.isRead && (
        <div className="flex h-2 w-2 shrink-0 rounded-full bg-green-ez" />
      )}
    </Button>
  );
}
