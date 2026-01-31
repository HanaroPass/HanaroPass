'use client';

import { useEffect, useState } from 'react';
import { getRecommendResult } from '../../actions/getRecommendResult.action';
import HospitalList from '../../components/hospital/HospitalList';
import SymptomHeader from '../../components/hospital/SymptomHeader';
import type { HospitalWithStatus } from '../types';

export default function SymptomRecommendClient() {
  const [user, setUser] = useState('HANA');
  const [symptom, setSymptom] = useState<string[]>();
  const [hospitals, setHospitals] = useState<HospitalWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const run = async () => {
      const raw = localStorage.getItem('symptom-result');
      if (!raw) return;

      const result = await getRecommendResult(raw);
      setUser(result.user);
      setSymptom(result.symptom);
      setHospitals(result.hospitals);
      setIsLoading(false);
    };

    run();
  }, []);

  return (
    <div className="space-y-4 px-4 py-6 pb-5">
      <SymptomHeader user={user} symptom={symptom} />
      <HospitalList hospitals={hospitals} isLoading={isLoading} />
    </div>
  );
}
