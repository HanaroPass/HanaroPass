'use client';

import { useEffect, useMemo, useState } from 'react';
import { handleActionResult } from '@/lib/error-handler';
import { getRegistrationDetailAction } from '../actions/language-regist.action';
import { LANGUAGES } from '../constants/language';
import type {
  ApplicationHistoryItem,
  RegistrationDetailResponse,
} from '../schemas/language-regist.schema';

export function useRegistrationDetail(hospitalId: number) {
  const [data, setData] = useState<RegistrationDetailResponse | null>(null);
  const [allApplications, setAllApplications] = useState<
    ApplicationHistoryItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hospitalId || Number.isNaN(hospitalId)) {
      setIsLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const result = await getRegistrationDetailAction(hospitalId);

        if (result.success) {
          setData(result.data);
          setAllApplications(result.data.allApplications);
        } else {
          alert(result.message);
        }
      } catch (err) {
        handleActionResult(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [hospitalId]);

  const formattedLangs = useMemo(() => {
    if (!data?.requestLangs) return [];

    return data.requestLangs
      .map((id) => {
        const langInfo = LANGUAGES.find((l) => l.id === id);
        return langInfo ? { ...langInfo } : null;
      })
      .filter((lang): lang is NonNullable<typeof lang> => !!lang);
  }, [data?.requestLangs]);

  const formatDate = (date: Date | string | null) => {
    if (!date) return '대기 중...';

    const d = typeof date === 'string' ? new Date(date) : date;
    return d
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/\. /g, '. ');
  };

  return {
    data,
    allApplications,
    isLoading,
    formattedLangs,
    formatDate,
  };
}
