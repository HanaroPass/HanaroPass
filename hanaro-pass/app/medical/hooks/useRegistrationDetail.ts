'use client';

import { useEffect, useState } from 'react';
import { getRegistrationDetailAction } from '../actions/language-regist.action';
import type { RegistrationDetailResponse } from '../schemas/language-regist.schema';

export function useRegistrationDetail(hospitalId: number) {
  const [data, setData] = useState<RegistrationDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hospitalId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const result = await getRegistrationDetailAction(hospitalId);
        if (result.success) {
          setData(result.data);
        } else {
          setData(null);
          alert(result.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [hospitalId]);

  const formattedLangs = data?.requestLangs || [];
  const formatDate = (date: Date | null) =>
    date
      ? new Date(date)
          .toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          .replace(/\. /g, '. ')
      : '대기 중...';

  return {
    data,
    isLoading,
    formattedLangs,
    formatDate,
  };
}
