'use client';

import { AnimatePresence } from 'framer-motion';
import type { Notification } from '@/lib/generated/prisma';
import NotificationCard from './NotificationCard';

export default function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="popLayout">
        {notifications.map((noti) => (
          <NotificationCard key={noti.id} notification={noti} />
        ))}
      </AnimatePresence>
    </div>
  );
}
