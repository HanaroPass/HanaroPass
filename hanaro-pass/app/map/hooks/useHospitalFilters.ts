import { useMemo, useState } from 'react';
import { DEPARTMENT_MAP } from '@/app/map/constants/departments';
import { LANGUAGE_MAP } from '@/app/map/constants/languages';
import type { MapBounds } from '../types/map';

export type Hospital = {
  id: number;
  nameKo: string;
  nameEn?: string | null;
  address: string;
  addressEn?: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  openHours: string;
  imageUrl?: string | null;
  languages: string[];
  departments: string[];
  departmentsEn?: string[];
  aiSummary?: string;
};

type FilterType = 'language' | 'department' | null;

export function useHospitalFilters(
  hospitals: Hospital[],
  mapBounds: MapBounds | null,
  lang: 'ko' | 'en',
) {
  const [active, setActive] = useState<FilterType>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );

  const toDisplayLabel = (
    value: string,
    type: 'language' | 'department',
    lang: 'ko' | 'en',
  ) => {
    if (lang === 'ko') return value;

    if (type === 'language') {
      const idx = LANGUAGE_MAP.ko.indexOf(
        value as (typeof LANGUAGE_MAP.ko)[number],
      );
      return idx >= 0 ? LANGUAGE_MAP.en[idx] : value;
    }

    if (type === 'department') {
      const idx = DEPARTMENT_MAP.ko.indexOf(
        value as (typeof DEPARTMENT_MAP.ko)[number],
      );
      return idx >= 0 ? DEPARTMENT_MAP.en[idx] : value;
    }

    return value;
  };

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const languageMatch =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((lang) => h.languages.includes(lang));

      const departmentMatch =
        selectedDepartments.length === 0 ||
        selectedDepartments.some((dep) => h.departments.includes(dep));

      const boundsMatch =
        !mapBounds ||
        (h.latitude >= mapBounds.south &&
          h.latitude <= mapBounds.north &&
          h.longitude >= mapBounds.west &&
          h.longitude <= mapBounds.east);

      return languageMatch && departmentMatch && boundsMatch;
    });
  }, [hospitals, selectedLanguages, selectedDepartments, mapBounds]);

  const baseLabels = {
    language: lang === 'en' ? 'Languages' : '소통 가능 언어',
    department: lang === 'en' ? 'Departments' : '진료 과목',
  };

  const makeLabel = (
    selected: string[],
    defaultLabel: string,
    type: 'language' | 'department',
    lang: 'ko' | 'en',
  ) => {
    if (selected.length === 0) return defaultLabel;

    const display = selected.map((v) => toDisplayLabel(v, type, lang));

    if (display.length === 1) return display[0];
    if (display.length === 2) return `${display[0]}, ${display[1]}`;

    const suffix =
      lang === 'en' ? `+${display.length - 2}` : `외 ${display.length - 2}개`;

    return `${display[0]}, ${display[1]} ${suffix}`;
  };

  const languageLabel = makeLabel(
    selectedLanguages,
    baseLabels.language,
    'language',
    lang,
  );

  const departmentLabel = makeLabel(
    selectedDepartments,
    baseLabels.department,
    'department',
    lang,
  );

  const toggleFilter = (type: FilterType) => {
    setActive((prev) => (prev === type ? null : type));
  };

  return {
    active,
    setActive,
    toggleFilter,
    selectedLanguages,
    setSelectedLanguages,
    selectedDepartments,
    setSelectedDepartments,
    filteredHospitals,
    languageLabel,
    departmentLabel,
    selectedHospital,
    setSelectedHospital,
    visibleHospitals: filteredHospitals,
  };
}
