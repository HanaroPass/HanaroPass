'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getAdminReviewDetailAction,
  updateApplicationStatusAction,
} from '../actions/admin-applitaion.action';
import type { AdminReviewDetailResponse } from '../schemas/admin-application.schema';

export function useAdminReview(id: number) {
  const [data, setData] = useState<AdminReviewDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
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

  const handleUpdateStatus = async (status: 'APPROVED' | 'REJECTED') => {
    if (
      !confirm(`${status === 'APPROVED' ? '승인' : '반려'} 처리하시겠습니까?`)
    )
      return false;
    try {
      setIsUpdating(true);
      const result = await updateApplicationStatusAction(id, status);
      if (result.success) {
        alert('처리가 완료되었습니다.');
        return true;
      }
      alert(result.message);
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
