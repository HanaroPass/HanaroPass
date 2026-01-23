'use client';

import { MAP_EMBASSY_MOCK } from '../../mock/embassyExchange';
import { PlaceCard } from '../ui/PlaceCard';

export function EmbassyContent() {
  return (
    <div className="flex flex-col px-2">
      <PlaceCard
        data={{
          id: MAP_EMBASSY_MOCK.id,
          name: MAP_EMBASSY_MOCK.placeName,
          type: '대사관, 영사관',
          address: MAP_EMBASSY_MOCK.address,
          phone: MAP_EMBASSY_MOCK.phone,
          explainTime: MAP_EMBASSY_MOCK.openHours,
          distance: '',
        }}
      />
      <div className="px-4 text-[11px] text-gray-400 leading-normal">
        * 대사관 방문 전 전화로 예약 가능 여부를 확인하시는 것을 권장합니다.
      </div>
    </div>
  );
}
