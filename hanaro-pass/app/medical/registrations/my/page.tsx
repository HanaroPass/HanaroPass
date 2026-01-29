'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ApplicationStatusTabs } from '../../components/languageAdmin/ApplicationAdminTabs';
import { HospitalApplicationCard } from '../../components/languageAdmin/HospitalApplicationCard';
import type { StatusType } from '../../constants/statusConfig';
import {
  type MyRegistration,
  useMyRegistrations,
} from '../../hooks/useMyRegistrations'; // ✅ 사용자 훅으로 교체
import { LoadingScreen } from '../complete/page';

export default function MyRegistrationListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('status') as StatusType) || 'PENDING';

  const { applications, counts, isLoading } = useMyRegistrations();

  const filteredApplications = useMemo(() => {
    return (applications as MyRegistration[]).filter(
      (app) => app.status === activeTab,
    );
  }, [applications, activeTab]);

  const handleTabChange = (status: StatusType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', status);
    router.push(`/medical/registrations/my?${params.toString()}`);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex h-full flex-col bg-(--color-gray-200)">
      <section className="shrink-0">
        <ApplicationStatusTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={counts}
        />
      </section>

      <section className="no-scrollbar flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-4">
          {filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="font-medium font-sans text-base text-black-600">
                신청 내역이 없습니다
              </p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <Link
                key={app.id}
                href={`/medical/registrations/${app.hospitalId}`}
                className="block transition-transform active:scale-[0.98]"
              >
                <HospitalApplicationCard
                  key={app.id}
                  id={app.hospitalId}
                  name={app.hospitalName}
                  status={app.status}
                  langCount={app.requestLangs.length}
                  languages={app.requestLangs}
                  date={new Date(app.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                />
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
