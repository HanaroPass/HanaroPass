'use client';

import { useState } from 'react';
import { ApplicationStatusTabs } from '../components/languageAdmin/ApplicationAdminTabs';
import { HospitalApplicationCard } from '../components/languageAdmin/HospitalApplicationCard';
import type { StatusType } from '../constants/statusConfig';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    name: '서울대학교병원',
    status: 'pending' as StatusType,
    langCount: 3,
    languages: ['영어', '중국어', '일본어'],
    date: '2026.01.19 14:23',
  },
  {
    id: 2,
    name: '강남세브란스병원',
    status: 'pending' as StatusType,
    langCount: 4,
    languages: ['영어', '중국어', '일본어', '+1'],
    date: '2026.01.19 10:15',
  },
  {
    id: 3,
    name: '삼성서울병원',
    status: 'approved' as StatusType,
    langCount: 4,
    languages: ['영어', '중국어', '일본어', '+1'],
    date: '2026.01.17 09:30',
  },
  {
    id: 4,
    name: '삼성서울병원1',
    status: 'approved' as StatusType,
    langCount: 4,
    languages: ['영어', '중국어', '일본어', '+1'],
    date: '2026.01.17 09:30',
  },
  {
    id: 5,
    name: '삼성서울병원2',
    status: 'approved' as StatusType,
    langCount: 4,
    languages: ['영어', '중국어', '일본어', '+1'],
    date: '2026.01.17 09:30',
  },
  {
    id: 6,
    name: '삼성서울병원3',
    status: 'approved' as StatusType,
    langCount: 4,
    languages: ['영어', '중국어', '일본어', '+1'],
    date: '2026.01.17 09:30',
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<StatusType>('pending');

  // QQQ : 실제 데이터에서 상태별 개수 계산!
  const counts = {
    pending: MOCK_APPLICATIONS.filter((app) => app.status === 'pending').length,
    approved: MOCK_APPLICATIONS.filter((app) => app.status === 'approved')
      .length,
    rejected: MOCK_APPLICATIONS.filter((app) => app.status === 'rejected')
      .length,
  };

  const filteredApplications = MOCK_APPLICATIONS.filter(
    (app) => app.status === activeTab,
  );

  return (
    <div className="flex h-full flex-col bg-(--color-gray-200)">
      <section className="shrink-0">
        <ApplicationStatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />
      </section>

      <section className="no-scrollbar flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="font-medium font-sans text-base text-black-600">
                신청 결과가 없습니다
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <HospitalApplicationCard
                key={app.id}
                id={app.id}
                name={app.name}
                status={app.status}
                langCount={app.langCount}
                languages={app.languages}
                date={app.date}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
