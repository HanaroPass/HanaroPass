'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import type { Hospital } from '@/lib/generated/prisma';
import { searchHospitalAction } from '../actions/languageRegist.action';

type HospitalSearchResult = Pick<Hospital, 'id' | 'nameKo' | 'address'>;

export function useHospitalSearch(searchQuery: string) {
  const [hospitals, setHospitals] = useState<HospitalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { actionError } = useToast();

  useEffect(() => {
    const sanitized = searchQuery.replace(/\s+/g, '');
    if (!sanitized || sanitized.length < 2) {
      setHospitals([]);
      setIsLoading(false);
      return;
    }

    const fetchHospitals = async () => {
      setIsLoading(true);
      const result = await searchHospitalAction(searchQuery);

      if (!result.success) {
        actionError(result);
        setHospitals([]);
      } else {
        setHospitals(result.data);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(fetchHospitals, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, actionError]);

  return { hospitals, isLoading };
}
