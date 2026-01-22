'use client';

import { useEffect, useState } from 'react';
import type { Hospital } from '@/lib/generated/prisma';
import { searchHospitalAction } from '../actions/language-regist.action';

type HospitalSearchResult = Pick<Hospital, 'id' | 'nameKo' | 'address'>;

export function useHospitalSearch(searchQuery: string) {
  const [hospitals, setHospitals] = useState<HospitalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sanitized = searchQuery.replace(/\s+/g, '');

    if (!sanitized) {
      setHospitals([]);
      setIsLoading(false);
      return;
    }

    const fetchHospitals = async () => {
      setIsLoading(true);

      const result = await searchHospitalAction(searchQuery);

      if (!result.success) {
        alert(`[에러코드 - ${result.status}] ${result.message}`);
        setHospitals([]);
      } else {
        setHospitals(result.data);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(fetchHospitals, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return { hospitals, isLoading };
}
