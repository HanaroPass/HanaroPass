'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import HospitalGuide from '@/app/medical/components/languageRegistration/HospitalGuide';
import RegistrationSummary from '@/components/result/RegistrationSummary';
import ActionButton from '@/components/ui/ActionButton';
import { getRegistrationResultAction } from '../../actions/language-regist.action';
import StatusBadge from '../../components/StatusBadge';
import type { StatusType } from '../../constants/statusConfig';

export default function HospitalRegistrationCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
        router.push('/medical/registrations');
      }
    };

    fetchResult();
  }, [hospitalId, router]);

  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        로딩 중...
      </div>
    );

  const summaryItems = [
    { label: '신청 병원', value: data.hospitalName },
    { label: '신청 일시', value: data.createdAt },
    {
      label: '상태',
      value: <StatusBadge status={data.status} />,
    },
  ];

  return (
    <>
      <main className="app-main no-scrollbar flex flex-col justify-center">
        <RegistrationSummary
          title={`병원 등록 신청이\n완료되었습니다`}
          description={`관리자 확인 후 승인되면\n알림을 보내드릴게요`}
          items={summaryItems}
        />

        <HospitalGuide text="승인 완료 시 외국인 환자가 귀하의 병원 정보를 확인할 수 있게 됩니다" />
      </main>

      {/* 2. 하단 버튼 영역: main이 위에서 공간을 다 차지하므로 자동으로 화면 맨 아래 고정됨 */}
      <div className="space-y-3 border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        <ActionButton
          text="신청 내역"
          onClick={() =>
            router.push(`/medical/lang-application/management/${hospitalId}`)
          }
        />
        <ActionButton
          text="처음으로"
          onClick={() => router.push('/')}
          className="bg-gray-100 font-semibold text-black-400 shadow-none hover:bg-gray-200"
        />
      </div>
    </>
  );
}
