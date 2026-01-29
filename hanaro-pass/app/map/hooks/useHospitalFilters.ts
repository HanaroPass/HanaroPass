import { useMemo, useState } from 'react';
import type { MapBounds } from '../types/map';

export type Hospital = {
  id: number;
  nameKo: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  openHours: string;
  imageUrl?: string | null;
  languages: string[];
  departments: string[];
  aiSummary?: string;
};

type FilterType = 'language' | 'department' | null;

export function useHospitalFilters(
  hospitals: Hospital[],
  mapBounds: MapBounds | null,
) {
  const [active, setActive] = useState<FilterType>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );

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

  const makeLabel = (selected: string[], defaultLabel: string) => {
    if (selected.length === 0) return defaultLabel;
    if (selected.length === 1) return selected[0];
    if (selected.length === 2) return `${selected[0]}, ${selected[1]}`;
    return `${selected[0]}, ${selected[1]} 외 ${selected.length - 2}개`;
  };

  const languageLabel = makeLabel(selectedLanguages, '소통 가능 언어');
  const departmentLabel = makeLabel(selectedDepartments, '진료 과목');

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
