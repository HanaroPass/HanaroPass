import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getRegistrationResultAction } from '../actions/languageRegist.action';
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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hospitalId) {
      alert('유효하지 않은 접근입니다.');
      router.push('/medical/registrations');
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);
      try {
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
      } catch (err) {
        console.error('Registration Result Fetch Error:', err);
        alert('등록 결과를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [hospitalId, router]);

  return { data, isLoading, hospitalId };
}
