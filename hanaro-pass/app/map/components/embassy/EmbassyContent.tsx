'use client';

import { MAP_EMBASSY_MOCK } from '../../mock/embassyExchange';
import { PlaceCard } from '../ui/PlaceCard';

export function EmbassyContent() {
  return (
    <div className="flex flex-col gap-2 px-6 py-2">
      <PlaceCard data={MAP_EMBASSY_MOCK} />
      <div className="text-[11px] text-gray-400 leading-normal">
        * 대사관 방문 전 전화로 예약 가능 여부를 확인하시는 것을 권장합니다.
      </div>
    </div>
  );
}
