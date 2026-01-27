'use client';

import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import {
  getAdminReviewDetailAction,
  updateApplicationStatusAction,
} from '../actions/adminApplication.action';
import type { AdminReviewDetailResponse } from '../schemas/adminApplication.schema';
import { IdSchema } from '../schemas/languageRegist.schema';

export function useAdminReview(id: number) {
  const [data, setData] = useState<AdminReviewDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const idValidation = IdSchema.safeParse(id);

      if (!idValidation.success) {
        setData(null);
        setError('유효하지 않은 신청 ID입니다.');
        return;
      }
      const result = await getAdminReviewDetailAction(id);

      if (result.success) setData(result.data);
      else {
        setData(null);
        setError(result.message);
      }
    } catch (err: unknown) {
      setData(null);
      setError((err as Error).message || '데이터 로딩 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const { success, actionError, systemError } = useToast();

  const handleUpdateStatus = async (status: 'APPROVED' | 'REJECTED') => {
    try {
      setIsUpdating(true);
      const result = await updateApplicationStatusAction(id, status);
      if (result.success) {
        success(
          '처리가 완료되었습니다.',
          `${status === 'APPROVED' ? '승인' : '반려'} 상태로 변경되었습니다.`,
        );
        await fetchDetail();
        return true;
      } else {
        actionError(result);
        return false;
      }
    } catch {
      systemError(`${status === 'APPROVED' ? '승인' : '반려'} 처리`);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    data,
    isLoading,
    isUpdating,
    error,
    handleUpdateStatus,
  };
}
