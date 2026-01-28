'use client';

import { Globe, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ConfirmModal } from '@/components/toast/ConfirmModal';
import ActionButton from '@/components/ui/ActionButton';
import { useToast } from '@/hooks/useToast';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import LanguageCard from '../../components/languageRegistration/LanguageCard';
import SectionHeader from '../../components/languageRegistration/SectionHeader';
import { LANGUAGES } from '../../constants/language';
import { useLanguageRegistration } from '../../hooks/useLanguageRegistration';

export default function LanguageRegistrationClient() {
  const router = useRouter();
  const { info } = useToast();
  const {
    hospitalId,
    hospitalName,
    selectedIds,
    setSelectedIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    initialIds,
    isChanged,
    isValid,
    showPendingModal,
    setShowPendingModal,
  } = useLanguageRegistration();

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const actionText = isSubmitting
    ? '신청 중...'
    : initialIds.length > 0
      ? isChanged
        ? `언어 정보 수정하기 (${selectedIds.length})`
        : '변경 사항 없음'
      : `병원 언어 등록 신청하기${selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}`;

  const hospitalLabel = hospitalName ?? '';

  const handleReset = () => {
    setSelectedIds(initialIds);
    setShowResetModal(false);
    info('선택이 초기 상태로 되돌려졌습니다.');
  };

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

        <div className="flex items-center justify-between pr-6">
          <SectionHeader icon={Globe} title="진료 가능 언어" />
          {isChanged && (
            <button
              onClick={() => setShowResetModal(true)}
              className="mt-6 flex items-center gap-1 text-black-400 text-xs transition-colors hover:text-black-600"
            >
              <RotateCcw className="size-3" />
              초기화
            </button>
          )}
        </div>

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
          onClick={() => setShowSubmitConfirm(true)}
          className="py-7 text-lg"
        />
      </div>
      <ConfirmModal
        open={showPendingModal}
        onOpenChange={setShowPendingModal}
        title="심사 진행 중"
        description={`이미 '${hospitalName}'에 대해 심사 중인 내역이 있습니다.\n결과가 나올 때까지 추가 신청이 불가능합니다.`}
        confirmText="내역 확인하기"
        cancelText="돌아가기"
        onConfirm={() => router.replace(`/medical/registrations/${hospitalId}`)}
        onCancel={() => router.back()}
      />

      <ConfirmModal
        open={showSubmitConfirm}
        onOpenChange={setShowSubmitConfirm}
        title="등록 신청 확인"
        description="선택하신 언어 정보로 등록을 요청하시겠습니까?"
        variant="success"
        onConfirm={submitApplication}
      />

      <ConfirmModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        title="선택 초기화"
        description="선택하신 모든 언어 설정을 지우고 처음 상태로 되돌리시겠습니까?"
        confirmText="초기화"
        variant="danger"
        onConfirm={handleReset}
      />
    </div>
  );
}
