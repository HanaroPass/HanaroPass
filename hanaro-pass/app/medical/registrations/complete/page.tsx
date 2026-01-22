'use client';

import { useParams, useRouter } from 'next/navigation';
import HospitalGuide from '@/app/medical/components/languageRegistration/HospitalGuide';
import StatusBadge from '@/app/medical/components/StatusBadge';
import RegistrationSummary from '@/components/result/RegistrationSummary';
import ActionButton from '@/components/ui/ActionButton';

export default function HospitalRegistrationCompletePage() {
  const params = useParams();
  const router = useRouter();
  const hospitalId = params.hospitalId as string;

  /**
   * QQQ (Data Flow & Prisma Plan):
   * 1. POST 요청 응답 처리:
   * - /api/medical/lang-application 호출 후 반환된 신규 레코드 데이터 사용.
   * 2. 필드 매칭:
   * - '신청 병원': Hospital 테이블의 nameKo (id로 조회)
   * - '신청 일시': 서버에서 생성된 Timestamp (new Date().toISOString() 등)
   * 3. 상태 값:
   * - 초기값은 무조건 'pending'으로 서버 응답에 포함되어야 함.
   */
  const summaryItems = [
    { label: '신청 병원', value: '강남병원' },
    { label: '신청 일시', value: '2026.01.19 08:53:55' },
    { label: '상태', value: <StatusBadge status="pending" /> },
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
