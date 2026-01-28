'use client';

import { CheckCheck, Trash2 } from 'lucide-react'; // Trash2 추가
import { useToast } from '@/hooks/useToast';
import { HttpError } from '@/lib/errorHandler';
import { useAlert } from '@/providers/alertProvider';
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
  const { alert } = useAlert();

  const handleAllReadClick = () => {
    alert({
      title: '모든 알림 읽음',
      description: '도착한 모든 알림을 읽음 처리하시겠습니까?',
      actionLabel: '확인',
      onAction: async () => {
        try {
          const result = await markAllAsReadAction();
          if (!result.success)
            throw new HttpError(result.message || '읽음 처리 실패', 500);
          onAllReadAction();
          success('알림 처리 완료', '모든 알림을 읽음 처리했습니다.');
        } catch (error) {
          systemError('전체 읽음 처리');
        }
      },
    });
  };

  const handleAllDeleteClick = () => {
    alert({
      title: '알림 전체 삭제',
      description:
        '모든 알림 내역을 삭제하시겠습니까? 삭제된 알림은 복구할 수 없습니다.',
      variant: 'destructive',
      actionLabel: '전체 삭제',
      onAction: async () => {
        try {
          const result = await deleteAllNotificationsAction();
          if (!result.success)
            throw new HttpError(result.message || '전체 삭제 실패', 500);
          onAllDeleteAction();
          info('알림 삭제 완료', '모든 알림 내역이 삭제되었습니다.');
        } catch (error) {
          systemError('전체 삭제');
        }
      },
    });
  };

  return (
    <div className="flex items-center gap-3">
      {' '}
      <button
        onClick={handleAllReadClick}
        className="flex items-center gap-1 text-gray-400 text-xs transition-colors hover:text-green-ez"
      >
        <CheckCheck className="h-3.5 w-3.5" />
        전체 읽음
      </button>
      <span className="h-3 w-px bg-gray-200" />
      <button
        onClick={handleAllDeleteClick}
        className="flex items-center gap-1 text-gray-400 text-xs transition-colors hover:text-red-500"
      >
        <Trash2 className="h-3.5 w-3.5" />
        전체 삭제
      </button>
    </div>
  );
}
