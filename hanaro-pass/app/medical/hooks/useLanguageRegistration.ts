'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getHospitalDetailAction,
  submitLanguageApplicationAction,
} from '../actions/language-regist.action';
import type { LanguageId } from '../constants/language';
import { IdSchema, SubmitSchema } from '../schemas/language-regist.schema';

export function useLanguageRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawHospitalId = Number(searchParams.get('hospitalId'));
  const hospitalId = IdSchema.safeParse(rawHospitalId).success
    ? rawHospitalId
    : null;

  const [hospitalName, setHospitalName] = useState('');
  const [selectedIds, setSelectedIds] = useState<LanguageId[]>([]);
  const [initialIds, setInitialIds] = useState<LanguageId[]>([]); // 기존에 선택된 언어들
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hospitalId === null) {
      alert('유효하지 않은 접근입니다.');
      router.back();
      return;
    }

    if (hasFetched.current) return;

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

  const toggleLanguage = (id: LanguageId) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isChanged = useMemo(() => {
    if (initialIds.length !== selectedIds.length) return true;
    const sortedInitial = [...initialIds].sort();
    const sortedSelected = [...selectedIds].sort();
    return sortedInitial.some((id, index) => id !== sortedSelected[index]);
  }, [initialIds, selectedIds]);

  const isValid = useMemo(() => {
    const validation = SubmitSchema.safeParse({
      hospitalId,
      languageIds: selectedIds,
    });
    return validation.success && isChanged;
  }, [hospitalId, selectedIds, isChanged]);

  const submitApplication = async () => {
    if (!hospitalId || !isValid) return;

    const validation = SubmitSchema.safeParse({
      hospitalId,
      languageIds: selectedIds,
    });

    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }

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
    initialIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    isChanged,
    isValid,
  };
}
