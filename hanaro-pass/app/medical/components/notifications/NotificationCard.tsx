'use client';

import { motion, useAnimation } from 'framer-motion';
import { CircleCheckBig, Clock, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ConfirmModal } from '@/components/toast/ConfirmModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { getRelativeTime } from '@/lib/date';
import type { Notification } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';
import {
  deleteNotificationAction,
  markAsReadAction,
} from '../../actions/notification.action';

type NotificationCardProps = {
  notification: Notification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const router = useRouter();
  const { info, actionError, systemError } = useToast();
  const controls = useAnimation();

  const [mounted, setMounted] = useState(false);
  const [isRead, setIsRead] = useState(notification.isRead);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openCard = () => {
    controls.start({ x: -80 });
    setIsOpen(true);
  };

  const closeCard = () => {
    controls.start({ x: 0 });
    setIsOpen(false);
  };

  // 승인/반려 여부에 따른 아이콘 설정
  const isApproved = notification.content.includes('승인');

  const handleDelete = async () => {
    try {
      const result = await deleteNotificationAction(notification.id);
      if (result.success) {
        info('알림이 삭제되었습니다.');
      } else {
        actionError(result);
      }
    } catch {
      systemError('알림 삭제');
    } finally {
      setShowDeleteModal(false);
      closeCard();
    }
  };

  const handleCardClick = async () => {
    if (isOpen) {
      closeCard();
      return;
    }
    if (!isRead) {
      setIsRead(true);
      const result = await markAsReadAction(notification.id);
      if (!result.success) {
        setIsRead(false);
        return;
      }
    }
    if (notification.link) router.push(notification.link);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-50">
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="absolute inset-y-0 right-0 flex w-20 items-center justify-center bg-red-500 text-white outline-none"
          aria-label="알림 삭제"
        >
          <div className="flex flex-col items-center gap-1">
            <Trash2 className="h-5 w-5" />
            <span className="font-bold text-[10px]">삭제</span>
          </div>
        </button>

        <motion.div
          drag="x"
          dragConstraints={{ left: -80, right: 0 }}
          dragElastic={0.1}
          animate={controls}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40 || info.velocity.x < -500) {
              openCard();
            } else {
              closeCard();
            }
          }}
          className="relative z-10"
        >
          <Button
            variant="outline"
            onClick={handleCardClick}
            className={cn(
              'h-auto w-full justify-between overflow-hidden rounded-xl border-2 p-4 transition-all',
              isRead
                ? 'border-gray-100 bg-white'
                : 'border-green-ez/30 bg-[#F0FDF4] shadow-sm',
              !notification.link && 'cursor-default',
            )}
          >
            <div className="flex w-full min-w-0 items-center gap-3">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                  isApproved
                    ? 'bg-green-100 text-green-600'
                    : 'bg-amber-100 text-amber-600',
                )}
              >
                {isApproved ? (
                  <CircleCheckBig className="h-6 w-6" />
                ) : (
                  <Clock className="h-6 w-6" />
                )}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-sans font-semibold text-base text-primary">
                  {notification.title}
                </p>
                <p className="wrap-break-word line-clamp-2 whitespace-pre-wrap font-sans text-muted-foreground text-sm">
                  {notification.content}
                </p>
                <p className="mt-1 font-sans text-[10px] text-gray-400">
                  {mounted ? getRelativeTime(notification.createdAt) : ''}
                </p>
              </div>
            </div>

            {!isRead && (
              <div className="ml-2 h-2.5 w-2.5 shrink-0 rounded-full bg-green-ez shadow-[0_0_8px_rgba(50,200,100,0.5)]" />
            )}
          </Button>
        </motion.div>

        <ConfirmModal
          open={showDeleteModal}
          onOpenChange={(open) => {
            setShowDeleteModal(open);
            if (!open) closeCard();
          }}
          title="알림 삭제"
          description="이 알림을 삭제하시겠습니까?"
          variant="danger"
          confirmText="삭제"
          onConfirm={handleDelete}
        />
      </div>
    </motion.div>
  );
}
