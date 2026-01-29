import { useEffect, useState } from 'react';
import { getMyApplicationsAction } from '../actions/languageRegist.action';
import type { LanguageInfo } from '../constants/language';
import type { StatusType } from '../constants/statusConfig';

export type MyRegistration = {
  id: number;
  hospitalId: number;
  hospitalName: string;
  address: string;
  status: StatusType;
  requestLangs: LanguageInfo[];
  createdAt: Date;
};

type MyRegistrationsData = {
  applications: MyRegistration[];
  counts: {
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
  };
};

export function useMyRegistrations() {
  const [data, setData] = useState<MyRegistrationsData>({
    applications: [],
    counts: { PENDING: 0, APPROVED: 0, REJECTED: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMyData() {
      const result = await getMyApplicationsAction(); // 이전에 만든 내 신청 내역 조회 액션
      if (result.success && result.data) {
        setData(result.data as MyRegistrationsData);
      }
      setIsLoading(false);
    }
    fetchMyData();
  }, []);

  return { ...data, isLoading };
}
