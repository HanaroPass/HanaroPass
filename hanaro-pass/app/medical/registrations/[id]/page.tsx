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
  Mail,
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
import { LoadingScreen } from '../complete/page';

export default function HospitalRegistrationDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const applicationId = Number(params.id);

  const { data, isLoading, formattedLangs, formatDate } =
    useRegistrationDetail(applicationId);

  const historySteps = useMemo(() => {
    if (!data?.history) return [];

    return data.history.flatMap((app) => {
      const steps = [];

      // 처리 결과 (승인/반려 시점에 대한 포인트)
      if (app.processedAt) {
        steps.push({
          key: `result-${app.id}`,
          label: app.status === 'REJECTED' ? '반려 완료' : '승인 완료',
          date: formatDate(app.processedAt),
          icon: app.status === 'REJECTED' ? AlertCircle : CheckCircle2,
          iconColor:
            app.status === 'REJECTED' ? 'text-red-500' : 'text-teal-600',
          isItalic: false,
        });
      } else if (app.status === 'PENDING') {
        steps.push({
          key: `pending-${app.id}`,
          label: '심사 대기 중',
          date: '-',
          icon: Clock,
          iconColor: 'text-gray-300',
          isItalic: true,
        });
      }

      steps.push({
        key: `submit-${app.id}`,
        label: '신청 완료',
        date: formatDate(app.createdAt),
        icon: CheckCircle2,
        iconColor: app.status === 'PENDING' ? 'text-teal-600' : 'text-gray-300',
        isItalic: false,
      });

      return steps;
    });
  }, [data?.history, formatDate]);

  if (isLoading) return <LoadingScreen />;
  if (!data)
    return (
      <div className="p-10 text-center text-black-600">
        정보를 불러올 수 없습니다.
      </div>
    );

  const hospitalInfo = [
    { label: '병원 정보', icon: Hospital, content: data.hospitalName },
    { label: '신청자 이메일', icon: Mail, content: data.applicantEmail },
    {
      label: '진료 가능 언어',
      icon: Globe,
      content: (
        <div className="flex flex-wrap items-center gap-3">
          {formattedLangs?.map((lang) => (
            <div
              key={lang?.id}
              className="flex items-center gap-1.5 rounded-full border-gray-100 bg-gray-50 px-4 py-2"
            >
              <span className="text-base">{lang?.flag}</span>
              <span className="font-sans font-semibold text-sm antialiased">
                {lang?.name}
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
            {item.label === '진료 가능 언어' ? (
              <div className="px-6 py-3">{item.content}</div>
            ) : (
              <InfoDetailPlate value={item.content} />
            )}
          </React.Fragment>
        ))}

        <SectionHeader icon={History} title="처리 히스토리" />
        <div className="mt-1 px-6 py-2">
          <div className="relative rounded-2xl bg-gray-100/50 p-5">
            <div className="absolute top-8 bottom-8 left-7.5 w-px bg-gray-300/80" />

            <div className="flex flex-col gap-8">
              {historySteps.map((step, index) => (
                <HistoryItem
                  key={step.key}
                  icon={step.icon}
                  iconColor={step.iconColor}
                  label={step.label}
                  date={step.date}
                  isLast={index === historySteps.length - 1}
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

      <div className="flex flex-row gap-3 border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        {data.status === 'REJECTED' && (
          <ActionButton
            text="다시 신청하기"
            onClick={() =>
              router.push(
                `/medical/registrations/new?hospitalId=${data.hospitalId}`,
              )
            }
            className="flex-1 bg-hana-red text-white-ez transition-opacity hover:bg-hana-red hover:opacity-90"
          />
        )}
        <ActionButton
          text="확인"
          onClick={() => router.push('/')}
          className="flex-1"
        />
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
