'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ActionButton from '@/components/ui/ActionButton';
import { HospitalCard } from '@/components/ui/HospitalCard';
import type {
  Hospital,
  useHospitalFilters,
} from '../../hooks/useHospitalFilters';
import type { MapBounds } from '../../types/map';
import { getHospitalStatus, parseOpenHours } from '../../utils/mapUtils';
import DepartmentFilterPanel from './DepartmentFilterPanel';
import FilterPanel from './FilterPanel';
import LanguageFilterPanel from './LanguageFilterPanel';

type Mode = 'list' | 'detail';

type Props = {
  mode: Mode;
  hospitals: Hospital[];
  hospital?: Hospital;
  mapBounds: MapBounds | null;
  lang: 'ko' | 'en';
  filterState: ReturnType<typeof useHospitalFilters>;
  onBackToList?: () => void;
};

export function HospitalContent({
  mode,
  hospital,
  filterState,
  lang,
  onBackToList,
}: Props) {
  const router = useRouter();

  const t = {
    empty:
      lang === 'en'
        ? 'No hospitals match the filters.'
        : '조건에 만족하는 병원이 없습니다.',
    translate:
      lang === 'en'
        ? 'Request AI translation of medical details'
        : 'AI에게 진료 내용 번역 요청하기',
    recommend:
      lang === 'en'
        ? 'Get AI hospital recommendations'
        : 'AI에게 나에게 맞는 병원 추천받기',
  };

  const {
    active,
    toggleFilter,
    selectedLanguages,
    setSelectedLanguages,
    selectedDepartments,
    setSelectedDepartments,
    visibleHospitals,
    languageLabel,
    departmentLabel,
  } = filterState;

  /* =====================
   * DETAIL MODE (병원 하나 상세)
   * ===================== */
  if (mode === 'detail') {
    if (!hospital) return null;

    const { openTime, closeTime } = parseOpenHours(hospital.openHours);
    return (
      <div className="relative flex h-full flex-col px-6 pt-2">
        <button
          onClick={onBackToList}
          aria-label="목록으로 나가기"
          className="-top-1 absolute right-4 z-10 text-gray-400 transition-colors"
        >
          <X width={20} height={20} />
        </button>
        <HospitalCard
          lang={lang}
          hospital={{
            name: hospital.nameKo,
            nameEn: hospital.nameEn ?? undefined,
            status: getHospitalStatus(hospital.openHours),
            openTime,
            closeTime,
            address: hospital.address,
            addressEn: hospital.addressEn,
            phone: hospital.phone ?? '-',
            languages: hospital.languages,
            departments: hospital.departments,
            imageUrl: hospital.imageUrl,
            aiSummary: hospital.aiSummary,
          }}
        />

        <div className="mt-auto border-[#F0F3F4] border-t bg-white py-4">
          <ActionButton
            text={t.translate}
            onClick={() =>
              router.push('/medical/symptoms/analyze?mode=translate')
            }
          />
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

  return (
    <div className="relative flex h-full flex-col">
      {/* 필터 토글 */}
      <div className="-top-px sticky z-20 bg-white px-4 py-1">
        <div className="flex gap-2">
          <button
            className={`${basePill} ${
              active === 'language' ? activePill : inactivePill
            }`}
            onClick={() => toggleFilter('language')}
          >
            {languageLabel}
          </button>

          <button
            className={`${basePill} ${
              active === 'department' ? activePill : inactivePill
            }`}
            onClick={() => toggleFilter('department')}
          >
            {departmentLabel}
          </button>
        </div>
      </div>

      {active === 'language' && (
        <div className="sticky top-11 z-30 bg-white px-6">
          <FilterPanel title={lang === 'en' ? 'Languages' : '소통 가능 언어'}>
            <LanguageFilterPanel
              value={selectedLanguages}
              onChange={setSelectedLanguages}
              lang={lang}
            />
          </FilterPanel>
        </div>
      )}

      {active === 'department' && (
        <div className="sticky top-11 z-30 bg-white px-6">
          <FilterPanel title={lang === 'en' ? 'Departments' : '진료 과목'}>
            <DepartmentFilterPanel
              value={selectedDepartments}
              onChange={setSelectedDepartments}
              lang={lang}
            />
          </FilterPanel>
        </div>
      )}

      {/* 병원 리스트 */}
      <div className="flex-1 overflow-y-auto px-6 pt-0">
        {visibleHospitals.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center text-gray-500 text-sm">
            {t.empty}
          </div>
        ) : (
          visibleHospitals.map((h, idx) => {
            const { openTime, closeTime } = parseOpenHours(h.openHours);

            return (
              <div
                key={h.id}
                className={
                  idx === visibleHospitals.length - 1
                    ? ''
                    : 'border-gray-100 border-b'
                }
              >
                <HospitalCard
                  lang={lang}
                  hospital={{
                    name: h.nameKo,
                    nameEn: h.nameEn ?? undefined,
                    status: getHospitalStatus(h.openHours),
                    openTime,
                    closeTime,
                    address: h.address,
                    addressEn: h.addressEn,
                    phone: h.phone ?? '-',
                    languages: h.languages,
                    departments: h.departments,
                    imageUrl: h.imageUrl,
                    aiSummary: h.aiSummary,
                  }}
                />
              </div>
            );
          })
        )}
      </div>

      <div className="sticky bottom-0 z-10 border-[#F0F3F4] border-t bg-white px-6 py-4">
        <ActionButton
          text={t.recommend}
          onClick={() =>
            router.push('/medical/symptoms/analyze?mode=recommend')
          }
        />
      </div>
    </div>
  );
}
