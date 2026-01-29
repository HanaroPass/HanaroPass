import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAlert } from '@/providers/alertProvider';
import { getRegistrationResultAction } from '../actions/languageRegist.action';
import type { StatusType } from '../constants/statusConfig';

export function useRegistrationResult(applicationId: number) {
  const router = useRouter();
  const { alert: modalAlert } = useAlert();

  const [data, setData] = useState<{
    hospitalName: string;
    createdAt: string;
    status: StatusType;
    applicantEmail: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!applicationId || Number.isNaN(applicationId)) {
      setData(null);
      setIsLoading(false);
      modalAlert({
        title: '접근 오류',
        description: '잘못된 신청 정보입니다.',
        onAction: () => router.push('/'),
      });
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const result = await getRegistrationResultAction(applicationId);

        if (result.success) {
          setData({
            hospitalName: result.data.hospitalName,
            applicantEmail: result.data.applicantEmail,
            createdAt: new Date(result.data.createdAt).toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
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
          modalAlert({
            title: '오류',
            description: result.message,
            actionLabel: '확인',
          });
        }
      } catch (err) {
        console.error('Registration Result Fetch Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [applicationId, router, modalAlert]);

  return { data, isLoading, applicationId };
}
