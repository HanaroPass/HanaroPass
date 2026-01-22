'use client';

import { Globe } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import DescriptionSection from '../../components/languageRegistration/DescriptionSection';
import HospitalGuide from '../../components/languageRegistration/HospitalGuide';
import type { Language } from '../../components/languageRegistration/LanguageCard';
import LanguageCard from '../../components/languageRegistration/LanguageCard';
import SectionHeader from '../../components/languageRegistration/SectionHeader';

const LANGUAGES: Language[] = [
  { id: 'en', name: '영어', sub: 'English', flag: '🇺🇸' },
  { id: 'cn', name: '중국어', sub: '中文', flag: '🇨🇳' },
  { id: 'jp', name: '일본어', sub: '日本語', flag: '🇯🇵' },
  { id: 'vn', name: '베트남어', sub: 'Tiếng Việt', flag: '🇻🇳' },
  { id: 'th', name: '태국어', sub: 'ภาษาไทย', flag: '🇹🇭' },
  { id: 'ph', name: '필리핀어', sub: 'Filipino (Tagalog)', flag: '🇵🇭' },
  { id: 'id', name: '인도네시아어', sub: 'Bahasa Indonesia', flag: '🇮🇩' },
  { id: 'kh', name: '캄보디아어', sub: 'Khmer', flag: '🇰🇭' },
  { id: 'mm', name: '미얀마어', sub: 'Myanmar', flag: '🇲🇲' },
  { id: 'mn', name: '몽골어', sub: 'Mongol', flag: '🇲🇳' },
  { id: 'ru', name: '러시아어', sub: 'Русский', flag: '🇷🇺' },
  { id: 'bd', name: '뱅골어', sub: 'Bangla', flag: '🇧🇩' },
  { id: 'lk', name: '스리랑카어', sub: 'Sinhala', flag: '🇱🇰' },
  { id: 'np', name: '네팔어', sub: 'Nepali', flag: '🇳🇵' },
  { id: 'uz', name: '우즈베키스탄어', sub: "O'zbek tili", flag: '🇺🇿' },
  { id: 'kr', name: '한국어', sub: '한국어', flag: '🇰🇷' },
];

export default function LanguageRegistrationPage() {
  const router = useRouter();
  const params = useParams();
  const hospitalId = params.hospitalId as string; // 2. URL에서 병원 ID 추출

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleLanguage = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isSelected = selectedIds.length > 0;

  // 등록 완료 페이지로 이동하는 핸들러
  const handleRegister = () => {
    // QQQ: 실제 배포 시에는 여기서 API POST 요청을 먼저 수행.
    console.log('제출된 데이터:', selectedIds);

    router.push(`/medical/registrations/new`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <DescriptionSection
          title="외국어 진료 가능 정보 등록"
          //   QQQ 나중에 병원 이름 동적으로 바꾸기
          descriptions={[
            '강남 병원에서 외국어 진료가 가능한 언어를',
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
          disabled={!isSelected}
          text={`병원 언어 등록 신청하기 ${isSelected ? `(${selectedIds.length})` : ''}`}
          onClick={handleRegister}
          className="py-7 text-lg"
        />
      </div>
    </div>
  );
}
