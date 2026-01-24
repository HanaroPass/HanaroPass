'use client';

import { useCallback, useEffect, useState } from 'react';
import { getAdminApplicationsAction } from '../actions/admin-application.action';
import type { StatusType } from '../constants/statusConfig';
import type { AdminApplicationItem } from '../schemas/admin-application.schema';

export function useAdminApplications() {
  const [data, setData] = useState<AdminApplicationItem[]>([]);
  const [counts, setCounts] = useState<Record<StatusType, number>>({
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getAdminApplicationsAction();

      if (result.success) {
        setData(result.data.applications);
        setCounts(result.data.counts);
      } else {
        setData([]);
        setCounts({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
        setError(result.message);
      }
    } catch (err: unknown) {
      setData([]);
      setCounts({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
      setError(
        (err as Error).message ||
          '데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    applications: data,
    counts,
    isLoading,
    error,
    refresh: fetchDashboard,
  };
}
