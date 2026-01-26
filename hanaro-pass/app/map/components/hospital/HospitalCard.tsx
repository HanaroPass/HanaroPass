import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';

export type HospitalInfo = {
  name: string;
  status: '진료 중' | '진료 종료';
  openTime: string;
  closeTime: string;
  address: string;
  phone: string | null;
  langName: string;
  deptName: string;
  imageUrl?: string | null;
  aiSummary?: string;
};

export function HospitalCard({ hospital }: { hospital: HospitalInfo }) {
  return (
    <div className="py-4">
      {/* ================= 상단: 정보 + 사진 ================= */}
      <div className="grid grid-cols-[minmax(0,1fr)_96px] gap-4">
        {/* 왼쪽 정보 */}
        <div className="space-y-1">
          {/* 병원명 */}
          <div className="font-bold text-gray-900 text-lg">{hospital.name}</div>

          {/* 영업시간 + 상태 */}
          <div className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-gray-600 text-sm">
            <span>
              영업시간: {hospital.openTime} ~ {hospital.closeTime}
            </span>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs ${
                hospital.status === '진료 중'
                  ? 'bg-green-100 text-green-900'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <Clock className="h-3 w-3" />
              {hospital.status}
            </span>
          </div>

          {/* 언어 */}
          <div className="font-semibold text-gray-600 text-sm">
            소통 언어: {hospital.langName}
          </div>

          {/* 진료과목 */}
          <div className="font-semibold text-gray-600 text-sm">
            진료과목: {hospital.deptName}
          </div>

          {/* 주소 */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{hospital.address}</span>
          </div>

          {/* 전화 */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{hospital.phone ?? '-'}</span>
          </div>
        </div>

        {/* 오른쪽 사진 (고정 높이) */}
        <div className="relative h-36 w-24 self-start overflow-hidden rounded-xl bg-gray-100">
          {hospital.imageUrl ? (
            <Image
              src={hospital.imageUrl}
              alt={`${hospital.name} 병원 이미지`}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs">
              이미지 없음
            </div>
          )}
        </div>
      </div>

      {/* ================= 하단: AI 한줄 요약 (전체 폭) ================= */}
      <div className="mt-5 rounded-xl border bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
          <Sparkles className="h-4 w-4 text-teal-500" />
          AI 한줄 요약
        </div>

        <p className="mt-1 text-[13px] text-gray-600 leading-snug">
          {hospital.aiSummary ?? 'AI 요약 정보가 아직 없어요.'}
        </p>
      </div>
    </div>
  );
}
