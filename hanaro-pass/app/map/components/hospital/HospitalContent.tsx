'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HospitalCard } from '@/components/ui/HospitalCard';
import DepartmentFilterPanel from './DepartmentFilterPanel';
import FilterPanel from './FilterPanel';
import LanguageFilterPanel from './LanguageFilterPanel';

function getHospitalStatus(openHours: string): '진료 중' | '진료 종료' {
  const [open, close] = openHours.split('-');
  const now = new Date();

  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);

  const openTime = new Date(now);
  openTime.setHours(openH, openM, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeH, closeM, 0, 0);

  return now >= openTime && now < closeTime ? '진료 중' : '진료 종료';
}

type FilterType = 'language' | 'department' | null;
type Mode = 'list' | 'detail';

type Hospital = {
  id: number;
  nameKo: string;
  address: string;
  phone: string | null;
  openHours: string;
  imageUrl?: string | null;
  languages: string[];
  departments: string[];
  aiSummary?: string;
};

type Props = {
  mode: Mode;
  hospitals: Hospital[];
  hospital?: Hospital;
  onBackToList?: () => void;
};

export function HospitalContent({
  mode,
  hospitals,
  hospital,
  onBackToList,
}: Props) {
  const router = useRouter();
  const [active, setActive] = useState<FilterType>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  /* =====================
   * DETAIL MODE (병원 하나 상세)
   * ===================== */
  if (mode === 'detail') {
    if (!hospital) return null;

    return (
      <div className="relative flex h-full flex-col px-6 pt-2">
        <button
          onClick={onBackToList}
          aria-label="목록으로 나가기"
          className="-top-1 absolute right-4 z-10 text-gray-400 transition-colors hover:text-gray-600"
        >
          <X width={20} height={20} />
        </button>
        <HospitalCard
          hospital={{
            name: hospital.nameKo,
            status: getHospitalStatus(hospital.openHours),
            openTime: hospital.openHours.split('-')[0],
            closeTime: hospital.openHours.split('-')[1],
            address: hospital.address,
            phone: hospital.phone ?? '-',
            languages: hospital.languages,
            departments: hospital.departments,
            imageUrl: hospital.imageUrl,
            aiSummary: hospital.aiSummary,
          }}
        />

        <div className="mt-auto border-[#F0F3F4] border-t bg-white py-4">
          <Button
            className="h-14 w-full rounded-xl bg-green-ez text-white"
            onClick={() => router.push('/medical/symptoms/analyze')}
          >
            AI에게 진료 내용 번역 요청하기
          </Button>
        </div>
      </div>
    );
  }

  /* =====================
   * LIST MODE (병원 목록)
   * ===================== */

  const basePill =
    'rounded-full px-5 py-2 text-sm font-medium border transition';
  const inactivePill = 'bg-white border-gray-300 text-gray-700';
  const activePill = 'bg-green-ez border-green-ez text-white';

  const languageLabel = makeLabel(selectedLanguages, '소통 가능 언어');
  const departmentLabel = makeLabel(selectedDepartments, '진료 과목');

  const filteredHospitals = hospitals.filter((h) => {
    const languageMatch =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) => h.languages.includes(lang));

    const departmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.some((dep) => h.departments.includes(dep));
    return languageMatch && departmentMatch;
  });

  return (
    <div className="relative flex h-full flex-col">
      {/* 필터 토글 */}
      <div className="bg-white px-4 pt-1">
        <div className="flex gap-2">
          <button
            className={`${basePill} ${
              active === 'language' ? activePill : inactivePill
            }`}
            onClick={() =>
              setActive((p) => (p === 'language' ? null : 'language'))
            }
          >
            {languageLabel}
          </button>

          <button
            className={`${basePill} ${
              active === 'department' ? activePill : inactivePill
            }`}
            onClick={() =>
              setActive((p) => (p === 'department' ? null : 'department'))
            }
          >
            {departmentLabel}
          </button>
        </div>
      </div>

      {/* 언어 필터 */}
      {active === 'language' && (
        <div className="absolute inset-x-0 top-14 z-30 px-6">
          <FilterPanel title="소통 가능 언어">
            <LanguageFilterPanel
              value={selectedLanguages}
              onChange={setSelectedLanguages}
            />
          </FilterPanel>
        </div>
      )}

      {/* 진료과 필터 */}
      {active === 'department' && (
        <div className="absolute inset-x-0 top-14 z-30 px-6">
          <FilterPanel title="진료 과목">
            <DepartmentFilterPanel
              value={selectedDepartments}
              onChange={setSelectedDepartments}
            />
          </FilterPanel>
        </div>
      )}

      {/* 병원 리스트 */}
      <div className="flex-1 overflow-y-auto px-6 pt-3">
        {filteredHospitals.map((h, idx) => {
          const [openTime, closeTime] = h.openHours.split('-');

          return (
            <div
              key={h.id}
              className={
                idx === filteredHospitals.length - 1
                  ? ''
                  : 'border-gray-300 border-b'
              }
            >
              <HospitalCard
                hospital={{
                  name: h.nameKo,
                  status: getHospitalStatus(h.openHours),
                  openTime,
                  closeTime,
                  address: h.address,
                  phone: h.phone ?? '-',
                  languages: h.languages,
                  departments: h.departments,
                  imageUrl: h.imageUrl,
                  aiSummary: h.aiSummary,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="border-[#F0F3F4] border-t bg-white px-6 py-4">
        <Button
          className="h-14 w-full rounded-xl bg-green-ez text-white"
          onClick={() =>
            router.push('/medical/symptoms/analyze?mode=recommend')
          }
        >
          AI에게 나에게 맞는 병원 추천받기
        </Button>
      </div>
    </div>
  );
}

function makeLabel(selected: string[], defaultLabel: string) {
  if (selected.length === 0) return defaultLabel;
  if (selected.length === 1) return selected[0];
  if (selected.length === 2) return `${selected[0]}, ${selected[1]}`;
  return `${selected[0]}, ${selected[1]} 외 ${selected.length - 2}개`;
}
