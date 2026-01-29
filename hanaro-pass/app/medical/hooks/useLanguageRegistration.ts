'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useAlert } from '@/providers/alertProvider';
import {
  getHospitalDetailAction,
  submitLanguageApplicationAction,
} from '../actions/languageRegist.action';
import type { LanguageId } from '../constants/language';
import { IdSchema, SubmitSchema } from '../schemas/languageRegist.schema';

export function useLanguageRegistration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { alert } = useAlert();

  const rawHospitalId = Number(searchParams.get('hospitalId'));
  const hospitalId = IdSchema.safeParse(rawHospitalId).success
    ? rawHospitalId
    : null;

  const [hospitalName, setHospitalName] = useState('');
  const [selectedIds, setSelectedIds] = useState<LanguageId[]>([]);
  const [initialIds, setInitialIds] = useState<LanguageId[]>([]); // 기존에 선택된 언어들
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerSuccess, error, warning, actionError, systemError } =
    useToast();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hospitalId === null) {
      error('유효하지 않은 접근입니다.', '병원 정보가 올바르지 않습니다.');
      router.back();
      return;
    }
    if (hasFetched.current) return;
    const fetchHospital = async () => {
      try {
        hasFetched.current = true;
        const result = await getHospitalDetailAction(hospitalId);

        if (result.success) {
          setHospitalName(result.data.nameKo);

          if (result.data.isPENDING && result.data.pendingAppId) {
            alert({
              title: '심사 진행 중',
              description: `'${result.data.nameKo}'에 대해 이미 심사 중인 내역이 있습니다.\n결과가 나올 때까지 추가 신청이 불가능합니다.`,
              actionLabel: '내역 확인하기',
              cancelLabel: '돌아가기',
              onAction: () =>
                router.replace(
                  `/medical/registrations/${result.data.pendingAppId}`,
                ),
              actionProps: {
                className: 'py-3 rounded-lg font-semibold active:opacity-90',
              },
              cancelProps: {
                className:
                  'py-3 rounded-lg font-semibold bg-gray-100 text-black-800 active:opacity-90',
                onClick: () => router.back(),
              },
            });
            return;
          }
          setSelectedIds(result.data.existingLangs);
          setInitialIds(result.data.existingLangs);
        } else {
          actionError(result);
          router.back();
        }
      } catch {
        hasFetched.current = false;
        systemError('병원 정보 불러오기');
      }
    };

    fetchHospital();
  }, [hospitalId, router, error, actionError, systemError, alert]);

  const toggleLanguage = (id: LanguageId) => {
    setSelectedIds((prev) => {
      const isSelecting = !prev.includes(id);

      if (isSelecting && prev.length >= 5) {
        warning('선택 제한', '언어는 최대 5개까지만 등록 가능합니다.');
        return prev;
      }

      return isSelecting ? [...prev, id] : prev.filter((item) => item !== id);
    });
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
      email,
    });
    return validation.success && isChanged;
  }, [hospitalId, selectedIds, email, isChanged]);

  const submitApplication = async () => {
    if (!hospitalId || !isValid) return;

    const validation = SubmitSchema.safeParse({
      hospitalId,
      languageIds: selectedIds,
      email,
    });

    if (!validation.success) {
      warning('입력 정보를 확인해주세요.', validation.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitLanguageApplicationAction(
        hospitalId,
        selectedIds,
        email,
      );
      if (result.success) {
        registerSuccess(hospitalName);
        router.push(`/medical/registrations/complete/?id=${result.data.id}`);
      } else {
        actionError(result);
      }
    } catch {
      systemError('언어 등록 신청');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    hospitalName,
    selectedIds,
    initialIds,
    email,
    setEmail,
    setSelectedIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    isChanged,
    isValid,
  };
}
