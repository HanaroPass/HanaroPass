import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAlert } from '@/providers/alertProvider';
import { getRegistrationResultAction } from '../actions/languageRegist.action';
import type { StatusType } from '../constants/statusConfig';

export function useRegistrationResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { alert: modalAlert } = useAlert();

  const hospitalId = Number(searchParams.get('hospitalId'));

  const [data, setData] = useState<{
    hospitalName: string;
    createdAt: string;
    status: StatusType;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hospitalId) {
      modalAlert({
        title: '유효하지 않은 접근',
        description: '병원 정보가 올바르지 않습니다.',
        actionLabel: '확인',
        onAction: () => router.push('/medical/registrations'),
        hideCancel: true,
      });
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const result = await getRegistrationResultAction(hospitalId);

        if (result.success) {
          setData({
            hospitalName: result.data.hospitalName,
            createdAt: new Date(result.data.createdAt).toLocaleString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
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
  }, [hospitalId, router, modalAlert]);

  return { data, isLoading, hospitalId };
}
