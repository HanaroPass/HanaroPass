'use client';

import { CheckCheck, Trash2 } from 'lucide-react'; // Trash2 추가
import { useState } from 'react';
import { ConfirmModal } from '@/components/toast/ConfirmModal';
import { useToast } from '@/hooks/useToast';
import { HttpError } from '@/lib/errorHandler';
import {
  deleteAllNotificationsAction,
  markAllAsReadAction,
} from '../../actions/notification.action';

type NotificationHeaderActionsProps = {
  onAllReadAction: () => void;
  onAllDeleteAction: () => void;
};

export default function NotificationHeaderActions({
  onAllReadAction,
  onAllDeleteAction,
}: NotificationHeaderActionsProps) {
  const { success, info, systemError } = useToast();
  const [showReadModal, setShowReadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태

  const handleAllRead = async () => {
    try {
      const result = await markAllAsReadAction();
      if (!result.success) {
        throw new HttpError(result.message || '읽음 처리 실패', 500);
      }
      onAllReadAction();
      success('알림 처리 완료', '모든 알림을 읽음 처리했습니다.');
    } catch (error) {
      if (error instanceof HttpError) {
        systemError(error.message);
      } else {
        systemError('전체 읽음 처리 중 문제가 발생했습니다.');
      }
    } finally {
      setShowReadModal(false);
    }
  };

  const handleAllDelete = async () => {
    try {
      const result = await deleteAllNotificationsAction();
      if (!result.success) {
        throw new HttpError(result.message || '전체 삭제 실패', 500);
      }
      onAllDeleteAction();
      info('알림 삭제 완료', '모든 알림 내역이 삭제되었습니다.');
    } catch (error) {
      if (error instanceof HttpError) {
        systemError(error.message);
      } else {
        systemError('전체 읽음 처리 중 문제가 발생했습니다.');
      }
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {' '}
      <button
        onClick={() => setShowReadModal(true)}
        className="flex items-center gap-1 text-gray-400 text-xs transition-colors hover:text-green-ez"
      >
        <CheckCheck className="h-3.5 w-3.5" />
        전체 읽음
      </button>
      <span className="h-3 w-px bg-gray-200" />
      <button
        onClick={() => setShowDeleteModal(true)}
        className="flex items-center gap-1 text-gray-400 text-xs transition-colors hover:text-red-500"
      >
        <Trash2 className="h-3.5 w-3.5" />
        전체 삭제
      </button>
      <ConfirmModal
        open={showReadModal}
        onOpenChange={setShowReadModal}
        title="모든 알림 읽음"
        description="도착한 모든 알림을 읽음 처리하시겠습니까?"
        confirmText="확인"
        onConfirm={handleAllRead}
      />
      <ConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="알림 전체 삭제"
        description="모든 알림 내역을 삭제하시겠습니까? 삭제된 알림은 복구할 수 없습니다."
        confirmText="전체 삭제"
        variant="danger"
        onConfirm={handleAllDelete}
      />
    </div>
  );
}
