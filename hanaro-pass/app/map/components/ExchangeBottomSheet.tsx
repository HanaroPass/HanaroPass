'use client';

import { locations } from '../mock/embassyExchange';
import { PlaceCard } from './PlaceCard';

// 임시
export function ExchangeBottomSheet() {
  return (
    <>
      <p>환전소 바텀시트</p>
      <div className="pointer-events-auto w-full max-w-md">
        <div className="p-4">
          {locations.map((loc) => (
            <PlaceCard key={loc.name} data={loc} />
          ))}
        </div>
      </div>
    </>
  );
}
