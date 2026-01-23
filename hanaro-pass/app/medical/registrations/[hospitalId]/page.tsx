'use client';

import {
  Calendar,
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
import { STATUS_CONFIG, type StatusType } from '../../constants/statusConfig';
import { useRegistrationDetail } from '../../hooks/useRegistrationDetail';

type TimelineEvent = {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  date: string;
  isItalic?: boolean;
};

const STATUS_ICON_COLORS: Record<StatusType, string> = {
  REJECTED: 'text-hana-red',
  APPROVED: 'text-hana-green',
  PENDING: 'text-black-400',
};

export default function HospitalRegistrationDetailsPage() {
  const router = useRouter();
  const { hospitalId: idParam } = useParams();
  const hospitalId = Number(idParam);

  const { data, isLoading, formattedLangs, formatDate, allApplications } =
    useRegistrationDetail(hospitalId);
  const timelineEvents = useMemo(() => {
    if (!allApplications || allApplications.length === 0) return [];

    return allApplications.flatMap((app, index) => {
      const events: TimelineEvent[] = [];
      const isLatest = index === 0;
      const order = allApplications.length - index;
      const statusInfo = STATUS_CONFIG[app.status as StatusType];

      // 결과 처리 이벤트 (승인/반려/대기)
      if (app.processedAt || (isLatest && app.status === 'PENDING')) {
        events.push({
          label: statusInfo.label,
          date: formatDate(app.processedAt),
          icon: statusInfo.Icon,
          iconColor:
            STATUS_ICON_COLORS[app.status as StatusType] || 'text-gray-300',
          isItalic: !app.processedAt,
        });
      }

      events.push({
        label: isLatest ? '신청 완료' : `${order}차 신청 완료`,
        date: formatDate(app.createdAt),
        icon: STATUS_CONFIG.APPROVED.Icon,
        iconColor: 'text-hana-green',
      });
      return events;
    });
  }, [allApplications, formatDate]);

  const infoSections = useMemo(() => {
    if (!data) return [];
    return [
      {
        id: 'hospital',
        label: '병원 정보',
        icon: Hospital,
        content: data.hospitalName,
      },
      {
        id: 'languages',
        label: '진료 가능 언어',
        icon: Globe,
        content: (
          <div className="flex flex-wrap items-center gap-2 py-1">
            {formattedLangs?.map((lang) => (
              <LanguageBadge key={lang?.id} lang={lang} />
            ))}
          </div>
        ),
      },
      {
        id: 'date',
        label: '최종 신청 일시',
        icon: Calendar,
        content: formatDate(data.createdAt),
      },
    ];
  }, [data, formattedLangs, formatDate]);

  if (isLoading) {
    return (
      <div className="p-10 text-center font-sans text-black-400">
        정보를 불러오는 중...
      </div>
    );
  }
  if (!data) {
    return (
      <div className="p-10 text-center font-sans text-black-400">
        정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="app-shell bg-white-ez">
      <main className="app-main no-scrollbar flex flex-col pb-6">
        <DescriptionSection
          title="등록 신청 상세 정보"
          descriptions={[
            '신청하신 외국어 진료 가능 정보의',
            '현재 처리 상태를 확인하실 수 있습니다.',
          ]}
        />

        <ApplicationStatusAlert status={data.status} />

        {infoSections.map((section) => (
          <React.Fragment key={section.id}>
            <SectionHeader icon={section.icon} title={section.label} />
            <InfoDetailPlate value={section.content} />
          </React.Fragment>
        ))}

        <SectionHeader icon={History} title="전체 신청 히스토리" />
        <div className="mt-1 px-6 py-2">
          <div className="relative rounded-2xl bg-gray-100/50 p-5">
            <div className="absolute top-8 bottom-8 left-7.5 w-px bg-silver-600" />
            <div className="flex flex-col gap-8">
              {timelineEvents.map((event, idx) => (
                <TimelineItem key={`${event.label}-${idx}`} {...event} />
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

      <footer className="space-y-3 border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        {data.status === 'REJECTED' && (
          <ActionButton
            text="다시 신청하기"
            onClick={() =>
              router.push(
                `/medical/registrations/new?hospitalId=${hospitalId}&parentId=${data.id}`,
              )
            }
            className="bg-hana-red text-white-ez transition-opacity hover:opacity-90"
          />
        )}
        <ActionButton
          text="확인"
          onClick={() => router.push('/')}
          className="bg-hana-green text-white-ez"
        />
      </footer>
    </div>
  );
}

const LanguageBadge = ({ lang }: { lang: any }) => (
  <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-silver-600 bg-white px-2.5 py-1.5 shadow-sm">
    <span className="text-base leading-none">{lang?.flag}</span>
    <span className="whitespace-nowrap font-sans text-black-900 text-sm">
      {lang?.name} ({lang?.sub})
    </span>
  </div>
);

const TimelineItem = ({
  icon: Icon,
  iconColor,
  label,
  date,
  isItalic,
}: TimelineEvent) => (
  <div className="relative flex w-full flex-row items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="z-10 flex h-5 w-5 items-center justify-center bg-[#f7f8f8]">
        <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} />
      </div>
      <span
        className={`whitespace-nowrap font-sans text-sm ${isItalic ? 'text-black-400' : 'text-black-900'}`}
      >
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
