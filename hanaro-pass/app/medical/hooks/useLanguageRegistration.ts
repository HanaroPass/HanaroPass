'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
  const [initialIds, setInitialIds] = useState<string[]>([]); // 기존에 선택된 언어들

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hospitalId || hasFetched.current) return;

    const fetchHospital = async () => {
      hasFetched.current = true;
      const result = await getHospitalDetailAction(hospitalId);

      if (result.success) {
        if (result.data.isPending) {
          alert(
            '이미 신청하여 심사 중인 내역이 있습니다.\n결과가 나올 때까지 추가 신청이 불가능합니다.',
          );
          router.replace(`/medical/registrations/${hospitalId}`);
          return;
        }

        setHospitalName(result.data.nameKo);
        setSelectedIds(result.data.existingLangs);
        setInitialIds(result.data.existingLangs);
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
    if (selectedIds.length === 0 || !isChanged) return;

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

  const isChanged =
    JSON.stringify([...initialIds].sort()) !==
    JSON.stringify([...selectedIds].sort());

  return {
    hospitalName,
    selectedIds,
    initialIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    isChanged,
    isValid: selectedIds.length > 0 && isChanged,
  };
}
