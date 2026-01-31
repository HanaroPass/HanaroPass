'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import RegistrationSummary from '@/components/result/RegistrationSummary';
import ActionButton from '@/components/ui/ActionButton';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import StatusBadge from '../../components/StatusBadge';
import { useRegistrationResult } from '../../hooks/useRegistrationResult';
import { LoadingScreen } from './page';

export default function HospitalRegistrationCompleteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applicationId = Number(searchParams.get('id'));
  const { data, isLoading } = useRegistrationResult(applicationId);

  if (isLoading || !data) return <LoadingScreen />;

  const summaryItems = [
    { label: '신청 병원', value: data.hospitalName },
    { label: '신청 일시', value: data.createdAt },
    {
      label: '상태',
      value: <StatusBadge status={data.status} />,
    },
    {
      label: '수신 이메일',
      value: data.applicantEmail,
    },
  ];

  return (
    <>
      <main className="app-main flex flex-col justify-center overflow-hidden">
        <RegistrationSummary
          title={`병원 등록 신청이\n완료되었습니다`}
          description={`신청하신 정보가 이메일로 발송되었습니다.\n관리자 확인 후 결과를 알려드릴게요.`}
          items={summaryItems}
        />

        <HospitalGuide text="승인 완료 시 외국인 환자가 귀하의 병원 정보를 확인할 수 있게 됩니다." />
      </main>

      <div className="flex gap-3 space-y-3 border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        <ActionButton
          text="처음으로"
          onClick={() => router.push('/')}
          className="flex-1 bg-gray-100 font-semibold text-black-400 shadow-none hover:bg-gray-200"
        />
        <ActionButton
          text="신청 내역"
          onClick={() => router.push(`/medical/registrations/${applicationId}`)}
          className="flex-1"
        />
      </div>
    </>
  );
}
