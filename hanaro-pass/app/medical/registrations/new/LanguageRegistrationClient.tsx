'use client';

import { Globe } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import LanguageCard from '../../components/languageRegistration/LanguageCard';
import SectionHeader from '../../components/languageRegistration/SectionHeader';
import { LANGUAGES } from '../../constants/language';
import { useLanguageRegistration } from '../../hooks/useLanguageRegistration';

export default function LanguageRegistrationClient() {
  const {
    hospitalName,
    selectedIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    initialIds,
    isChanged,
    isValid,
  } = useLanguageRegistration();

  const actionText = isSubmitting
    ? '신청 중...'
    : initialIds.length > 0
      ? isChanged
        ? `언어 정보 수정하기 (${selectedIds.length})`
        : '변경 사항 없음'
      : `병원 언어 등록 신청하기${selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}`;

  const hospitalLabel = hospitalName ?? '';

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <DescriptionSection
          title="외국어 진료 가능 정보 등록"
          descriptions={[
            hospitalLabel
              ? `${hospitalLabel}에서 외국어 진료가 가능한 언어를`
              : '병원 정보를 불러오는 중...',
            '아래에서 선택해주세요',
          ]}
        />
        <SectionHeader icon={Globe} title="진료 가능 언어" />
        <div className="px-6">
          <p className="mt-2 font-sans text-black-400 text-xs">
            (복수 선택 가능)
          </p>
          <p className="mt-1 font-sans text-black-600 text-xs">
            최소 1개 이상의 언어를 선택해주세요
          </p>
        </div>
        <div className="px-6 py-6">
          <div className="space-y-3 pb-6">
            {LANGUAGES.map((lang) => (
              <LanguageCard
                key={lang.id}
                lang={lang}
                isSelected={selectedIds.includes(lang.id)}
                onToggle={toggleLanguage}
              />
            ))}
          </div>
        </div>
        <div className="border-gray-200 border-t bg-white pb-8">
          <HospitalGuide text="등록하신 정보는 외국인 환자 병원을 검색할 때 표시됩니다." />
        </div>
      </div>
      <div className="border-gray-200 border-t bg-white px-6 py-4 pb-8">
        <ActionButton
          disabled={!isValid || isSubmitting}
          text={actionText}
          onClick={submitApplication}
          className="py-7 text-lg"
        />
      </div>
    </div>
  );
}
