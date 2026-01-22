'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getHospitalDetailAction,
  submitLanguageApplicationAction,
} from '../actions/language-regist.action';

export function useLanguageRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospitalId = Number(searchParams.get('hospitalId'));

  const [hospitalName, setHospitalName] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!hospitalId) return;

    const fetchHospital = async () => {
      const result = await getHospitalDetailAction(hospitalId);
      if (result.success) {
        setHospitalName(result.data.nameKo);
      } else {
        alert(result.message);
        router.back();
      }
    };

    fetchHospital();
  }, [hospitalId, router]);

  const toggleLanguage = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const submitApplication = async () => {
    if (selectedIds.length === 0) return;

    setIsSubmitting(true);
    const result = await submitLanguageApplicationAction(
      hospitalId,
      selectedIds,
    );
    setIsSubmitting(false);

    if (result.success) {
      router.push('/medical/registrations/complete');
    } else {
      alert(result.message);
    }
  };

  return {
    hospitalName,
    selectedIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    isValid: selectedIds.length > 0,
  };
}
