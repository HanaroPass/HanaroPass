'use client';

import { Globe, Mail, RotateCcw } from 'lucide-react';
import ActionButton from '@/components/ui/ActionButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { useAlert } from '@/providers/alertProvider';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import LanguageCard from '../../components/languageRegistration/LanguageCard';
import SectionHeader from '../../components/languageRegistration/SectionHeader';
import { LANGUAGES } from '../../constants/language';
import { useLanguageRegistration } from '../../hooks/useLanguageRegistration';

export default function LanguageRegistrationClient() {
  const { info } = useToast();
  const { alert } = useAlert();

  const {
    hospitalName,
    selectedIds,
    setSelectedIds,
    toggleLanguage,
    submitApplication,
    isSubmitting,
    initialIds,
    isChanged,
    isValid,
    email,
    setEmail,
  } = useLanguageRegistration();

  const handleResetClick = () => {
    alert({
      title: '선택 초기화',
      description:
        '선택하신 모든 언어 설정을 지우고 처음 상태로 되돌리시겠습니까?',
      actionLabel: '초기화',
      variant: 'destructive',
      onAction: () => {
        setSelectedIds(initialIds);
        info('선택이 초기 상태로 되돌려졌습니다.');
      },
    });
  };

  const handleSubmitClick = () => {
    alert({
      title: '등록 신청 확인',
      description: '선택하신 언어 정보로 등록을 요청하시겠습니까?',
      actionLabel: '신청하기',
      onAction: async () => {
        await submitApplication();
      },
    });
  };

  const actionText = isSubmitting
    ? '신청 중...'
    : initialIds.length > 0
      ? isChanged
        ? `언어 정보 수정하기 (${selectedIds.length})`
        : '변경 사항 없음'
      : `병원 언어 등록 신청하기${selectedIds.length > 0 ? ` (${selectedIds.length})` : ''}`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <DescriptionSection
          title="외국어 진료 가능 정보 등록"
          descriptions={[
            hospitalName
              ? `${hospitalName}에서 외국어 진료가 가능한 언어를`
              : '병원 정보를 불러오는 중...',
            '아래에서 선택해주세요',
          ]}
        />

        <div className="mb-4 px-2">
          <SectionHeader icon={Mail} title="결과 수신 이메일" />
          <div className="mt-2 space-y-2 px-6">
            <Label htmlFor="email" className="sr-only">
              이메일 주소
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border-gray-200 focus:border-hana-red focus:ring-hana-red"
            />
            <p className="mt-2 font-sans text-black-600 text-xs">
              심사 결과(승인/반려)가 위 메일 주소로 발송됩니다. 정확히
              입력해주세요.
            </p>
          </div>
        </div>
        <div className="px-2">
          <div className="flex items-center justify-between pr-4">
            <SectionHeader icon={Globe} title="진료 가능 언어" />
            {isChanged && (
              <button
                onClick={handleResetClick}
                className="mt-6 flex items-center gap-1 text-black-400 text-xs transition-colors hover:text-black-600"
              >
                <RotateCcw className="size-3" />
                초기화
              </button>
            )}
          </div>

          <div className="px-6">
            <p className="mt-2 font-sans text-black-600 text-xs">
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
        </div>
        <div className="border-gray-200 border-t bg-white pb-8">
          <HospitalGuide text="등록하신 정보는 외국인 환자에게 제공되는 병원 목록에 표시됩니다." />
        </div>
      </div>
      <div className="border-gray-200 border-t bg-white px-6 py-4 pb-8">
        <ActionButton
          disabled={!isValid || isSubmitting}
          text={actionText}
          onClick={handleSubmitClick}
          className="py-7 text-lg"
        />
      </div>
    </div>
  );
}
