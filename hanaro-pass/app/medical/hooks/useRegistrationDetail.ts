'use client';

import { useEffect, useState } from 'react';
import { getRegistrationDetailAction } from '../actions/languageRegist.action';
import type { RegistrationDetailResponse } from '../schemas/languageRegist.schema';

export function useRegistrationDetail(id: number) {
  const [data, setData] = useState<RegistrationDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setData(null);
      setIsLoading(false);
      return;
    }
    async function fetchDetail() {
      setIsLoading(true);
      try {
        const result = await getRegistrationDetailAction(id);
        if (result.success) {
          setData(result.data);
        } else {
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  const formattedLangs = data?.requestLangs || [];
  const history = data?.history || [];

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
    history,
  };
}
