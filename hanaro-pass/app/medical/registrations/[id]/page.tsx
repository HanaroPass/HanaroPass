'use client';

import {
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  History,
  Hospital,
  type LucideIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import DescriptionSection from '@/app/medical/components/languageRegistration/DescriptionSection';
import HospitalGuide from '@/app/medical/components/languageRegistration/HospitalGuide';
import SectionHeader from '@/app/medical/components/languageRegistration/SectionHeader';
import StatusBadge from '@/app/medical/components/StatusBadge';
import ActionButton from '@/components/header/ActionButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoDetailPlate } from '../../components/InfoDetailPlate';

/**
 * QQQ (Integration Plan):
 * 1. useQuery 등을 이용해 병원 상세 정보 API 호출 (hospitalId 활용)
 * 2. 서버 응답 데이터에 맞춰 hospitalInfo 배열 동적 매핑
 * 3. 'rejected' 상태일 때만 반려 사유를 보여주는 조건부 렌더링 추가
 */
export default function HospitalRegistrationDetailsPage() {
  const router = useRouter();
  // QQQ 1: API 연동 및 데이터 패칭
  // - Endpoint: GET /api/medical/lang-application/[hospitalId]
  // - 필요 데이터: { status: 'pending' | 'approved' | 'rejected', hospitalName: string, selectedLanguages: string[], createdAt: string, processedAt?: string }
  // - 고려사항: 데이터 로딩 중(isLoading)일 때 보여줄 스켈레톤 UI 필요
  const currentStatus = 'pending';

  // QQQ (Database Integration Plan):
  // 1. Data Fetching:
  //    - const hospital = await prisma.hospital.findUnique({
  //        where: { id: hospitalId },
  //        include: { HospitalLang: true }
  //      });
  // 2. Mapping:
  //    - 병원명: hospital.nameKo
  //    - 진료 가능 언어: hospital.HospitalLang.map(l => l.langName) -> UI의 '중국어 (中文)'와 포맷팅 일치 필요
  // 3. Pending/History Issue:
  //    - 현재 스키마에 '신청 일시'와 '진행 상태(Status)' 필드가 없음.
  //    - Hospital 모델에 createdAt을 추가하거나, 'HospitalRegistration' 모델을 신설하여 관리 권장.
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
            {/* QQQ 3: 상태별 동적 메시지 처리 */}
            {/* - status === 'rejected'인 경우, 서버에서 'rejectReason'을 추가로 받아와 
    - AlertDescription 하단에 '반려 사유: [사유]' 형태로 노출해야 함 
*/}
            <AlertDescription className="mt-7 pr-2 font-sans text-sm text-yellow-700 leading-relaxed">
              관리자가 확인 중입니다. 승인까지 1-2 영업일이 소요됩니다.
            </AlertDescription>
          </Alert>
        </div>

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
