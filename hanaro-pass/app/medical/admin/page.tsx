'use client';

import { useMemo, useState } from 'react';
import { ApplicationStatusTabs } from '../components/languageAdmin/ApplicationAdminTabs';
import { HospitalApplicationCard } from '../components/languageAdmin/HospitalApplicationCard';
import type { StatusType } from '../constants/statusConfig';
import { useAdminApplications } from '../hooks/useAdminApplication';
import { LoadingScreen } from '../registrations/complete/page';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<StatusType>('PENDING');
  const { applications, counts, isLoading, error } = useAdminApplications();

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => app.status === activeTab);
  }, [applications, activeTab]);

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-200 p-6 text-center">
        <p className="font-sans text-hana-red">{error}</p>
      </div>
    );
  }

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
                name={app.hospitalName} // 스키마의 hospitalName 매핑
                status={app.status}
                langCount={app.requestLangs.length}
                languages={app.requestLangs} // 언어 ID 배열 전달
                date={new Date(app.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
