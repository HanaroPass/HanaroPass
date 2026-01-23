'use client';

import { Calendar, Globe, Hospital } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { ApplicationStatusAlert } from '../../components/ApplicationStatusAlert';
import { InfoDetailPlate } from '../../components/InfoDetailPlate';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import SectionHeader from '../../components/languageRegistration/SectionHeader';

/**
 * QQQ (Admin Integration Plan):
 * 1. Data Fetching:
 * - useParams()의 id를 사용하여 특정 신청 건의 상세 정보 조회 (useQuery 권장)
 * - Endpoint: GET /api/admin/medical/registrations/[id]
 * 2. Action Logic:
 * - 승인: PATCH /api/admin/medical/registrations/[id] { status: 'approved' }
 * - 반려: PATCH /api/admin/medical/registrations/[id] { status: 'rejected' }
 * 3. Permission:
 * - 관리자 권한(Session/Middleware) 확인 필수
 */
export default function AdminReviewPage() {
  const router = useRouter();

  // QQQ: 실제 DB 상태 연동 (PENDING | APPROVED | REJECTED)
  const currentStatus = 'PENDING';

  // QQQ (Database Mapping):
  // - 병원명: hospital.name
  // - 언어: hospital.languages (Array) -> 국기 이모지 매핑 로직 필요
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
      <main className="app-main no-scrollbar flex flex-col pb-6 font-sans">
        {/* 1. DescriptionSection: 상단 가이드 */}
        <DescriptionSection
          title="신청 심사 상세 정보"
          descriptions={[
            '병원에서 신청한 외국어 진료 가능 정보를 확인하고',
            '승인 또는 반려 처리를 진행해 주세요.',
          ]}
        />

        <ApplicationStatusAlert status={currentStatus} isAdmin={true} />

        {hospitalInfo.map((item) => (
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
        {/* QQQ : 나중에 실제 데이터베이스에 연동 */}
        <ActionButton
          text="승인하기"
          onClick={() => {
            alert('승인되었습니다.');
            router.push('/medical/admin');
          }}
        />

        <ActionButton
          text="반려하기"
          className="border-none bg-red-500 text-white shadow-lg shadow-red-100 hover:bg-red-600"
          onClick={() => alert('반려 처리하시겠습니까?')}
        />
      </div>
    </>
  );
}
