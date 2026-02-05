'use client';

import type { Embassy } from '@/lib/generated/prisma';
import { PlaceCard } from '../ui/PlaceCard';

type EmbassyContentProps = {
  data?: Embassy | null;
  userCoords?: { lat: number; lng: number };
  lang: 'ko' | 'en';
};

export function EmbassyContent({
  data,
  userCoords,
  lang,
}: EmbassyContentProps) {
  if (!data) {
    return (
      <div className="flex h-40 items-center justify-center py-10 font-medium text-gray-400 text-sm">
        {lang === 'ko'
          ? '해당 국가의 대사관 정보를 찾을 수 없습니다.'
          : 'Embassy information for this country could not be found.'}
      </div>
    );
  }
  const displayOpenHours =
    lang === 'ko' && data.openHours
      ? data.openHours.replace(/Break/g, '휴게 시간')
      : data.openHours;

  return (
    <div className="flex flex-col px-2">
      <PlaceCard
        data={{
          id: data.id,
          name: lang === 'ko' ? data.nameKo : data.nameEn,
          type: lang === 'ko' ? '대사관, 영사관' : 'Embassy, Consulate',
          address: lang === 'ko' ? data.addressKo : data.addressEn,
          phone: data.phone,
          explainTime: displayOpenHours,
          distance: '',
          latitude: data.latitude,
          longitude: data.longitude,
        }}
        userCoords={userCoords}
        lang={lang}
      />
      <div className="flex gap-1 px-4 text-[11px] text-gray-400">
        <span className="shrink-0">*</span>
        <div>
          {lang === 'ko' ? (
            <>
              정보는 공공 데이터를 기반으로 하며, 실제 운영 상황과 다를 수
              있습니다.
              <br />
              방문 전 대사관에 직접 문의하시기 바랍니다.
            </>
          ) : (
            <>
              Information is based on public data and may differ from actual
              operations.
              <br />
              Please contact the embassy directly before visiting.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
