'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { Notification } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';
import { getNotificationsAction } from '../../actions/notification.action';
import NotificationCard from './NotificationCard';
import NotificationSkeleton from './NotificationSkeleton';

export default function NotificationList({
  initialNotifications,
}: {
  initialNotifications: Notification[];
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialNotifications.length >= 10);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1 });
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');

  const fetchNextPage = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    const result = await getNotificationsAction(page);

    if (result.success) {
      const nextData = result.data;
      if (nextData.length < 10) setHasMore(false);

      setNotifications((prev) => [...prev, ...nextData]);
      setPage((prev) => prev + 1);
    }
    setIsFetching(false);
  }, [page, isFetching, hasMore]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const result = await getNotificationsAction(1); // 1페이지부터 다시
    if (result.success) {
      setNotifications(result.data);
      setPage(2);
      setHasMore(result.data.length >= 10);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasMore, isFetching, fetchNextPage]);

  const filteredNotifications = useMemo(() => {
    if (filter === 'UNREAD') {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [notifications, filter]);

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center justify-center overflow-hidden"
          >
            <RefreshCcw className="h-5 w-5 animate-spin text-green-ez" />
          </motion.div>
        )}
      </AnimatePresence>
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

      <motion.div
        drag="y" // 세로 드래그 허용
        dragConstraints={{ top: 0, bottom: 0 }} // 제자리로 돌아오게 설정
        dragElastic={0.5} // 당길 때 저항감 부여 (0.5가 적당히 쫀득함)
        onDragEnd={(_, info) => {
          // 사용자가 아래로 50px 이상 당겼을 때 새로고침 실행
          if (info.offset.y > 50) {
            handleRefresh();
          }
        }}
        className="flex touch-pan-y flex-col gap-4" // touch-none은 브라우저 기본 당겨서 새로고침 방지
      >
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length > 0
            ? filteredNotifications.map((noti) => (
                <NotificationCard key={noti.id} notification={noti} />
              ))
            : !isFetching && (
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

        <div ref={ref} className="w-full pb-10">
          {isFetching && (
            <div className="flex flex-col gap-4">
              <NotificationSkeleton />
              <NotificationSkeleton />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
