'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { Notification } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';
import NotificationCard from './NotificationCard';

export default function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');
  const filteredNotifications = useMemo(() => {
    if (filter === 'UNREAD') {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [notifications, filter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2 flex gap-2">
        {(['ALL', 'UNREAD'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              'rounded-full px-4 py-1.5 font-medium text-sm transition-all',
              filter === type
                ? 'bg-green-ez text-white shadow-green-100 shadow-md'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200',
            )}
          >
            {type === 'ALL' ? '전체' : '읽지 않음'}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((noti) => (
              <NotificationCard key={noti.id} notification={noti} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <p className="text-gray-400 text-sm">
                {filter === 'UNREAD'
                  ? '읽지 않은 알림이 없습니다.'
                  : '도착한 알림이 없습니다.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
