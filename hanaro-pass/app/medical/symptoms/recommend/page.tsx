'use client';

import { useCallback, useEffect, useState } from 'react';
import { getFilteredHospitals } from '../../actions/filterHospital.action';
import { getName } from '../../actions/getName.action';
import { parseOutput } from '../../actions/symptoms.action';
import HospitalList from '../../components/hospital/HospitalList';
import SymptomHeader from '../../components/hospital/SymptomHeader';
import type { HospitalWithStatus } from '../types';

export default function SymptomRecommendPage() {
  const [symptom, setSymptom] = useState<string[] | undefined>(undefined);
  const [user, setUser] = useState('HANA');
  const [hospitals, setHospitals] = useState<HospitalWithStatus[]>([]);

  // 영업시간 필터링
  const filterHour = useCallback((openHours: string) => {
    const [openTime, closeTime] = openHours.split(' - ');
    const [openH, openM] = openTime.split(':').map(Number);
    const [closeH, closeM] = closeTime.split(':').map(Number);
    const now = new Date();

    const openDate = new Date();
    openDate.setHours(openH, openM, 0, 0);

    const closeDate = new Date();
    closeDate.setHours(closeH, closeM, 0, 0);

    const status: '진료 중' | '진료 종료' =
      now < openDate || now > closeDate ? '진료 종료' : '진료 중';
    console.log(openTime, closeTime, status);
    return { openTime, closeTime, status };
  }, []);

  useEffect(() => {
    const parseAndFilter = async () => {
      const data = localStorage.getItem('symptom-result');
      if (!data) return;

      const result = await parseOutput(data);
      const type = result.타입;

      const nextSymptom =
        type === 'SYMPTOM' ? result.주요_증상 : result.희망_시술;

      setSymptom(nextSymptom);

      const hospitals = await getFilteredHospitals(type, nextSymptom);

      const refinedHospitals = hospitals.map((h) => ({
        ...h,
        departments: h.HospitalDept.map((d) => d.deptName),
        languages: h.HospitalLang.map((l) => l.langName),
        aiSummary: h.HospitalReview?.aiSummary ?? null,
        ...filterHour(h.openHours),
      }));

      setHospitals(refinedHospitals);

      const name = await getName();
      setUser(name);
    };

    parseAndFilter();
  }, [filterHour]);

  return (
    <div className="space-y-4 px-4 py-6">
      <SymptomHeader user={user} symptom={symptom} />
      <HospitalList hospitals={hospitals} />
    </div>
  );
}
