'use client';

import {
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  History,
  Hospital,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import DescriptionSection from '@/app/medical/components/language/DescriptionSection';
import HospitalGuide from '@/app/medical/components/language/HospitalGuide';
import SectionHeader from '@/app/medical/components/language/SectionHeader';
import StatusBadge from '@/app/medical/components/StatusBadge';
import ActionButton from '@/components/header/ActionButton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const InfoDetailPlate = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 px-6 py-2">
    <div className="rounded-2xl bg-gray-100/50 p-4">{children}</div>
  </div>
);

export default function HospitalRegistrationDetailsPage() {
  const router = useRouter();
  // QQQ : 실제 데이터베이스 연동
  const currentStatus = 'pending';

  // QQQ : 실제 데이터베이스 연동
  const hospitalInfo = [
    { label: '병원 정보', icon: Hospital, content: '강남 병원' },
    {
      label: '진료 가능 언어',
      icon: Globe,
      content: (
        <div className="flex items-center gap-3">
          <span className="text-xl">🇨🇳</span>중국어 (中文)
        </div>
      ),
    },
    { label: '신청 일시', icon: Calendar, content: '2026. 01. 19. 09:43' },
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

        {/* QQQ : 실제 상태 연동 */}
        <div className="mt-4 px-6">
          <Alert className="relative rounded-2xl border-none bg-yellow-50 p-5">
            <div className="flex items-center gap-2 pr-24">
              <Clock className="h-5 w-5 shrink-0 text-yellow-600" />
              <span className="whitespace-nowrap font-bold font-hana text-base text-yellow-900">
                현재 상태
              </span>
            </div>
            <div className="absolute top-5 right-5 flex-none">
              <StatusBadge status={currentStatus} />
            </div>
            <AlertDescription className="mt-7 pr-2 font-sans text-sm text-yellow-700 leading-relaxed">
              관리자가 확인 중입니다. 승인까지 1-2 영업일이 소요됩니다.
            </AlertDescription>
          </Alert>
        </div>

        {hospitalInfo.map((item) => (
          <React.Fragment key={item.label}>
            {' '}
            <SectionHeader icon={item.icon} title={item.label} />
            <InfoDetailPlate>
              <div className="font-sans font-semibold text-base text-black-900">
                {item.content}
              </div>
            </InfoDetailPlate>
          </React.Fragment>
        ))}

        <SectionHeader icon={History} title="처리 히스토리" />
        <div className="mt-1 px-6 py-2">
          <div className="relative rounded-2xl bg-gray-100/50 p-5">
            <div className="absolute top-8 bottom-8 left-7.5 w-px bg-gray-500" />

            <div className="flex flex-col gap-8">
              <HistoryItem
                icon={CheckCircle2}
                iconColor="text-teal-600"
                label="신청 완료"
                date="2026. 01. 19. 09:43"
                isLast={false}
              />
              <HistoryItem
                icon={Clock}
                iconColor="text-gray-300"
                label="승인 완료"
                date="대기 중..."
                isLast={true}
                isItalic
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <HospitalGuide
            text={`승인이 완료되면 알림을 보내드립니다.\n승인 후에는 외국인 환자가 귀하의 병원 정보를 확인할 수 있습니다.`}
          />
        </div>
      </main>

      <div className="border-gray-100 border-t bg-white-ez px-6 py-4 pb-8">
        <ActionButton text="확인" onClick={() => router.push('/')} />
      </div>
    </>
  );
}

const HistoryItem = ({
  icon: Icon,
  iconColor,
  label,
  date,
  isLast,
  isItalic,
}: any) => (
  <div className="relative flex w-full flex-row items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="z-10 flex h-5 w-5 items-center justify-center bg-[#F8F9FA]">
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
