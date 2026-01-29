'use client';

import { Calendar, Globe, Hospital } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { useAlert } from '@/providers/alertProvider';
import { ApplicationStatusAlert } from '../../components/ApplicationStatusAlert';
import { InfoDetailPlate } from '../../components/InfoDetailPlate';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import SectionHeader from '../../components/languageRegistration/SectionHeader';
import { useAdminReview } from '../../hooks/useAdminReview';
import { useRequireAdmin } from '../../hooks/useRequireAdmin';
import { LoadingScreen } from '../../registrations/complete/page';

export default function AdminReviewPage() {
  const router = useRouter();
  const { id } = useParams();
  const { alert } = useAlert();

  const { data, isLoading, isUpdating, error, handleUpdateStatus } =
    useAdminReview(Number(id));
  useRequireAdmin(error);

  if (isLoading) return <LoadingScreen />;
  if (error) return null;
  if (!data)
    return (
      <div className="p-10 text-center font-sans text-black-600">
        데이터를 찾을 수 없습니다.
      </div>
    );

  const onApproveClick = () => {
    alert({
      title: '신청 승인',
      description: `'${data.hospitalName}'의 정보를 승인하시겠습니까?\n승인 즉시 서비스에 반영됩니다.`,
      actionLabel: '승인하기',
      onAction: async () => {
        const success = await handleUpdateStatus('APPROVED');
        if (success) router.push('/medical/admin');
      },
    });
  };

  const onRejectClick = () => {
    alert({
      title: '신청 반려',
      description: `'${data.hospitalName}'의 신청을 반려하시겠습니까?\n반려 시 해당 병원에 알림이 전송됩니다.`,
      variant: 'destructive',
      actionLabel: '반려하기',
      onAction: async () => {
        const success = await handleUpdateStatus('REJECTED');
        if (success) router.push('/medical/admin');
      },
    });
  };

  const infoItems = [
    { label: '병원 정보', icon: Hospital, content: data.hospitalName },
    {
      label: '진료 가능 언어',
      icon: Globe,
      content: (
        <div className="flex flex-wrap gap-2">
          {data.requestLangs.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1"
            >
              <span>{lang.flag}</span>
              <span className="text-black-900 text-sm">{lang.name}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: '신청 일시',
      icon: Calendar,
      content: new Date(data.createdAt).toLocaleString(),
    },
  ];

  return (
    <>
      <main className="app-main no-scrollbar flex flex-col pb-6 font-sans">
        {/* 1. DescriptionSection: 상단 가이드 */}
        <DescriptionSection
          title="신청 심사 상세 정보"
          descriptions={[
            '병원에서 신청한 외국어 진료 가능 정보를 확인하고',
            '승인 또는 반려 처리를 진행해 주세요.',
          ]}
        />

        <ApplicationStatusAlert status={data.status} isAdmin={true} />

        {infoItems.map((item) => (
          <React.Fragment key={item.label}>
            <SectionHeader icon={item.icon} title={item.label} />
            <InfoDetailPlate value={item.content} />
          </React.Fragment>
        ))}

        <div className="mt-4">
          <HospitalGuide
            text={`승인 후에는 외국인 환자가 이 병원 정보를 실시간으로 조회할 수 있습니다.`}
          />
        </div>
      </main>

      <div className="flex flex-col gap-3 border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        <ActionButton
          text={isUpdating ? '처리 중...' : '승인하기'}
          disabled={isUpdating || data.status !== 'PENDING'}
          onClick={onApproveClick}
        />

        <ActionButton
          text="반려하기"
          disabled={isUpdating || data.status !== 'PENDING'}
          className="border-none bg-red-500 text-white shadow-lg shadow-red-100 hover:bg-red-600"
          onClick={onRejectClick}
        />
      </div>
    </>
  );
}
