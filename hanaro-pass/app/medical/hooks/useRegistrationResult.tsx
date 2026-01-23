import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRegistrationResultAction } from '../actions/language-regist.action';
import type { StatusType } from '../constants/statusConfig';

export function useRegistrationResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospitalId = Number(searchParams.get('hospitalId'));

  const [data, setData] = useState<{
    hospitalName: string;
    createdAt: string;
    status: StatusType;
  } | null>(null);

  useEffect(() => {
    if (!hospitalId) {
      alert('유효하지 않은 접근입니다.');
      router.push('/medical/registrations');
      return;
    }

    const fetchResult = async () => {
      const result = await getRegistrationResultAction(hospitalId);

      if (result.success) {
        setData({
          hospitalName: result.data.hospitalName,
          createdAt: new Date(result.data.createdAt).toLocaleString('ko-KR'),
          status: result.data.status,
        });
      } else {
        alert(result.message);
      }
    };

    fetchResult();
  }, [hospitalId, router]);

  return { data, isLoading: !data, hospitalId };
}
