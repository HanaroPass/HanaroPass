import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { DEPARTMENT_MAP } from '@/app/map/constants/departments';
import { LANGUAGE_MAP } from '@/app/map/constants/languages';
import AIResultIcon from '@/components/ui/AIResultIcon';

export type HospitalInfo = {
  nameKo: string;
  nameEn?: string;
  status: '진료 중' | '진료 종료';
  openTime: string;
  closeTime: string;
  address: string;
  addressEn?: string | null;
  phone: string | null;
  languages: string[];
  departments: string[];
  imageUrl?: string | null;
  aiSummary?: string;
  aiSummaryEn?: string;
};

const MAX_DEPT = 6;

export function HospitalCard({
  hospital,
  lang,
}: {
  hospital: HospitalInfo;
  lang?: 'ko' | 'en';
}) {
  const [expanded, setExpanded] = useState(false);

  /* ================= 변환 로직 ================= */
  const t = {
    hours: lang === 'en' ? 'Hours' : '진료 시간',
    languages: lang === 'en' ? 'Languages' : '소통 언어',
    departments: lang === 'en' ? 'Departments' : '진료 과목',
    more: lang === 'en' ? 'More' : '더보기',
    less: lang === 'en' ? 'Less' : '접기',
    aiSummary: lang === 'en' ? 'AI Summary' : 'AI 요약',
    aiEmpty:
      lang === 'en'
        ? 'AI summary not available yet.'
        : '아직 AI 요약이 제공되지 않았어요.',
    noImage: lang === 'en' ? 'No Image' : '이미지 없음',
    status:
      hospital.status === '진료 중'
        ? lang === 'en'
          ? 'Open'
          : '진료 중'
        : lang === 'en'
          ? 'Closed'
          : '진료 종료',
  };
  const displayName =
    lang === 'en' && hospital.nameEn ? hospital.nameEn : hospital.nameKo;

  const displayHours =
    hospital.openTime === '24시간'
      ? lang === 'en'
        ? '24 Hours'
        : '24시간'
      : lang === 'en'
        ? `${hospital.openTime} - ${hospital.closeTime}`
        : `${hospital.openTime} ~ ${hospital.closeTime}`;

  const displayLanguages =
    lang === 'en'
      ? hospital.languages.map((l) => {
          const idx = LANGUAGE_MAP.ko.findIndex((k) => k === l);
          return idx >= 0 ? LANGUAGE_MAP.en[idx] : l;
        })
      : hospital.languages;

  const displayDepartments =
    lang === 'en'
      ? hospital.departments.map((d) => {
          const idx = DEPARTMENT_MAP.ko.findIndex((k) => k === d);
          return idx >= 0 ? DEPARTMENT_MAP.en[idx] : d;
        })
      : hospital.departments;

  const displayAiSummary =
    lang === 'en'
      ? (hospital.aiSummaryEn ?? t.aiEmpty)
      : (hospital.aiSummary ?? t.aiEmpty);

  const displayAddress =
    lang === 'en' && hospital.addressEn ? hospital.addressEn : hospital.address;

  /* ================= 기본 필드 ================= */
  const hasMore = displayDepartments.length > MAX_DEPT;
  const visibleDepts = expanded
    ? displayDepartments
    : displayDepartments.slice(0, MAX_DEPT);

  return (
    <div className="py-4">
      {/* ================= 상단 ================= */}
      <div className="grid grid-cols-[minmax(0,1fr)_120px] gap-5">
        <div className="space-y-1">
          <div className="font-bold text-gray-900 text-lg">{displayName}</div>

          <div className="flex items-center text-sm">
            <span className="font-semibold text-gray-700">{t.hours}</span>
            <span className="text-gray-800">: {displayHours}</span>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-gray-700">{t.languages}</span>
            <span className="text-gray-800">
              : {displayLanguages.join(', ')}
            </span>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-gray-700">{t.departments}</span>
            <span className="text-gray-800">: {visibleDepts.join(', ')}</span>
            {hasMore && (
              <button
                onClick={() => setExpanded((p) => !p)}
                className="ml-2 text-gray-600 text-xs underline"
              >
                {expanded ? t.less : t.more}
              </button>
            )}
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative h-30 w-30 overflow-hidden rounded-xl bg-gray-100">
          <div className="absolute top-1.5 right-1.5 z-10">
            <span
              className={`rounded-full px-2 py-1 font-medium text-xs ${
                hospital.status === '진료 중'
                  ? 'bg-green-500 text-green-900'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {t.status}
            </span>
          </div>

          {hospital.imageUrl ? (
            <Image
              src={hospital.imageUrl}
              alt={`${displayName} image`}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400 text-xs">
              {t.noImage}
            </div>
          )}
        </div>
      </div>

      {/* 주소 */}
      <div className="flex items-center gap-2 pt-2 text-gray-500 text-sm">
        <MapPin className="h-4 w-4" />
        <span>{displayAddress}</span>
      </div>

      {/* 전화 */}
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Phone className="h-4 w-4" />
        <span>{hospital.phone ?? '-'}</span>
      </div>

      {/* AI 요약 */}
      <div className="mt-5 rounded-xl border bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <AIResultIcon size="sm" />
          <span>{t.aiSummary}</span>
        </div>

        <p className="mt-1 text-[13px] text-gray-600">{displayAiSummary}</p>
      </div>
    </div>
  );
}
