'use client';

import { Calendar, Globe, Hospital } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { ApplicationStatusAlert } from '../../components/ApplicationStatusAlert';
import { InfoDetailPlate } from '../../components/InfoDetailPlate';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import SectionHeader from '../../components/languageRegistration/SectionHeader';
import { useAdminReview } from '../../hooks/useAdminReview';
import { LoadingScreen } from '../../registrations/complete/page';

export default function AdminReviewPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    data,
    isLoading,
    isUpdating,
    error,
    handleUpdateStatus,
    formattedLangs,
  } = useAdminReview(Number(id));

  if (isLoading || !data) return <LoadingScreen />;
  if (error)
    return (
      <div className="p-10 text-center font-sans text-hana-red">{error}</div>
    );

  const infoItems = [
    { label: '병원 정보', icon: Hospital, content: data.hospitalName },
    {
      label: '진료 가능 언어',
      icon: Globe,
      content: (
        <div className="flex flex-wrap gap-2">
          {formattedLangs.map((lang: any) => (
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
          onClick={async () => {
            if (await handleUpdateStatus('APPROVED'))
              router.push('/medical/admin');
          }}
        />

        <ActionButton
          text="반려하기"
          disabled={isUpdating || data.status !== 'PENDING'}
          className="border-none bg-red-500 text-white shadow-lg shadow-red-100 hover:bg-red-600"
          onClick={async () => {
            if (await handleUpdateStatus('REJECTED'))
              router.push('/medical/admin');
          }}
        />
      </div>
    </>
  );
}
