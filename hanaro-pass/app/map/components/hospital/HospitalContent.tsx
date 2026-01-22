'use client';

import { useState } from 'react';
import { hospitalLocations } from '@/app/map/mock/hospitalFilter.mock';
import { Button } from '@/components/ui/button';
import DepartmentFilterPanel from './DepartmentFilterPanel';
import FilterPanel from './FilterPanel';
import { HospitalCard } from './HospitalCard';
import LanguageFilterPanel from './LanguageFilterPanel';

type FilterType = 'language' | 'department' | null;

export function HospitalContent() {
  const [active, setActive] = useState<FilterType>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const basePill =
    'rounded-full px-5 py-2 text-sm font-medium border transition';
  const inactivePill = 'bg-white border-gray-300 text-gray-700';
  const activePill = 'bg-green-ez border-green-ez text-white';

  const languageLabel = makeLabel(selectedLanguages, '소통 가능 언어');
  const departmentLabel = makeLabel(selectedDepartments, '진료 과목');

  const filteredHospitals = hospitalLocations.filter((hospital) => {
    const languageMatch =
      selectedLanguages.length === 0 ||
      selectedLanguages.some((lang) => hospital.languages.includes(lang));

    const departmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.some((dep) => hospital.departments.includes(dep));

    return languageMatch && departmentMatch;
  });

  return (
    <div className="relative flex h-full flex-col">
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

      <div className="flex-1 overflow-y-auto px-6 pt-3">
        <div className="pt-2">
          {filteredHospitals.map((hospital, idx) => (
            <div
              key={hospital.name}
              className={
                idx === filteredHospitals.length - 1
                  ? ''
                  : 'border-gray-300 border-b'
              }
            >
              <HospitalCard hospital={hospital} />
            </div>
          ))}

          {filteredHospitals.length === 0 && (
            <div className="py-10 text-center text-gray-400 text-sm">
              조건에 맞는 병원이 없어요
            </div>
          )}
        </div>
      </div>

      <div className="border-gray-100 border-t bg-white px-6 py-4">
        <Button className="h-14 w-full rounded-xl bg-green-ez text-white">
          나에게 맞는 병원 찾기
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
