'use client';

import { useRouter } from 'next/navigation';
import RegistrationSummary from '@/components/result/RegistrationSummary';
import ActionButton from '@/components/ui/ActionButton';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import StatusBadge from '../../components/StatusBadge';
import { useRegistrationResult } from '../../hooks/useRegistrationResult';
import { LoadingScreen } from './page';

export default function HospitalRegistrationCompleteClient() {
  const router = useRouter();
  const { data, isLoading, hospitalId } = useRegistrationResult();

  if (isLoading || !data) return <LoadingScreen />;

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
          onClick={() => router.push(`/medical/registrations/${hospitalId}`)}
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
