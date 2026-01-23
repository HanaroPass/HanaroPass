'use client';

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  History,
  Hospital,
  type LucideIcon,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import DescriptionSection from '@/app/medical/components/languageRegistration/DescriptionSection';
import HospitalGuide from '@/app/medical/components/languageRegistration/HospitalGuide';
import SectionHeader from '@/app/medical/components/languageRegistration/SectionHeader';
import ActionButton from '@/components/ui/ActionButton';
import { ApplicationStatusAlert } from '../../components/ApplicationStatusAlert';
import { InfoDetailPlate } from '../../components/InfoDetailPlate';
import { useRegistrationDetail } from '../../hooks/useRegistrationDetail';

export default function HospitalRegistrationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const hospitalId = Number(params.hospitalId);

  console.log('전체 Params:', params);
  console.log('가져온 hospitalId:', Number(params.hospitalId));

  const { data, isLoading, formattedLangs, formatDate } =
    useRegistrationDetail(hospitalId);

  const historySteps = useMemo(() => {
    if (!data) return [];

    return [
      {
        label: '신청 완료',
        date: formatDate(data.createdAt),
        icon: CheckCircle2,
        iconColor: 'text-teal-600',
        isLast: false,
        isItalic: false,
      },
      {
        // REJECTED 상태일 때만 '반려 완료'로 표시
        label: data.status === 'REJECTED' ? '반려 완료' : '승인 완료',
        date: formatDate(data.processedAt),
        // 상태 및 처리 여부에 따른 아이콘 분기
        icon: !data.processedAt
          ? Clock
          : data.status === 'REJECTED'
            ? AlertCircle
            : CheckCircle2,
        iconColor: !data.processedAt
          ? 'text-gray-300'
          : data.status === 'REJECTED'
            ? 'text-red-500'
            : 'text-teal-600',
        isLast: true,
        isItalic: !data.processedAt,
      },
    ];
  }, [data, formatDate]);

  if (isLoading || !data)
    return <div className="p-10 text-center">정보를 불러오는 중...</div>;

  const hospitalInfo = [
    { label: '병원 정보', icon: Hospital, content: data.hospitalName },
    {
      label: '진료 가능 언어',
      icon: Globe,
      content: (
        <div className="flex items-center gap-3">
          {formattedLangs?.map((lang) => (
            <div
              key={lang?.id}
              className="flex items-center gap-1.5 rounded-md border border-gray-100 bg-gray-50 px-2 py-1"
            >
              <span>{lang?.flag}</span>
              <span className="text-sm">
                {lang?.name} ({lang?.sub})
              </span>
            </div>
          ))}
        </div>
      ),
    },
    { label: '신청 일시', icon: Calendar, content: formatDate(data.createdAt) },
  ];

  return (
    <>
      <main className="app-main no-scrollbar flex flex-col pb-6">
        <DescriptionSection
          title="등록 신청 상세 정보"
          descriptions={[
            '신청하신 외국어 진료 가능 정보의',
            '현재 처리 상태를 확인하실 수 있습니다.',
          ]}
        />

        <ApplicationStatusAlert status={data.status} />

        {hospitalInfo.map((item) => (
          <React.Fragment key={item.label}>
            <SectionHeader icon={item.icon} title={item.label} />
            <InfoDetailPlate value={item.content} />
          </React.Fragment>
        ))}

        <SectionHeader icon={History} title="처리 히스토리" />
        <div className="mt-1 px-6 py-2">
          <div className="relative rounded-2xl bg-gray-100/50 p-5">
            <div className="absolute top-8 bottom-8 left-7.5 w-px bg-gray-300/80" />

            <div className="flex flex-col gap-8">
              {/* QQQ 4: 히스토리 타임라인 동적 생성 */}
              {/* - 현재는 수동 입력이나, 서버의 [ { stage: 'apply', date: '...' }, { stage: 'approve', date: '...' } ] 
    - 배열 데이터를 순회하여 HistoryItem을 동적으로 생성하도록 변경 필요
*/}
              {historySteps.map((step) => (
                <HistoryItem
                  key={step.label}
                  icon={step.icon}
                  iconColor={step.iconColor}
                  label={step.label}
                  date={step.date}
                  isLast={step.isLast}
                  isItalic={step.isItalic}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <HospitalGuide
            text={`승인이 완료되면 알림을 보내드립니다.\n승인 후에는 외국인 환자가 귀하의 병원 정보를 확인할 수 있습니다.`}
          />
        </div>
      </main>

      <div className="space-y-3 border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        {data.status === 'REJECTED' && (
          <ActionButton
            text="다시 신청하기"
            onClick={() =>
              router.push(`/medical/registrations/new?hospitalId=${hospitalId}`)
            }
            className="bg-hana-red transition-opacity hover:bg-hana-redtext-white-ez hover:opacity-90"
          />
        )}
        <ActionButton text="확인" onClick={() => router.push('/')} />
      </div>
    </>
  );
}

type HistoryItemProps = {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  date: string;
  isLast?: boolean;
  isItalic?: boolean;
};

const HistoryItem = ({
  icon: Icon,
  iconColor,
  label,
  date,
  isLast,
  isItalic,
}: HistoryItemProps) => (
  <div className="relative flex w-full flex-row items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="z-10 flex h-5 w-5 items-center justify-center bg-gray-100">
        <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
      </div>
      <span className="whitespace-nowrap font-sans text-black-400 text-sm">
        {label}
      </span>
    </div>
    <span
      className={`font-medium font-sans text-sm ${isItalic ? 'text-black-400 italic' : 'text-black-900'}`}
    >
      {date}
    </span>
  </div>
);
