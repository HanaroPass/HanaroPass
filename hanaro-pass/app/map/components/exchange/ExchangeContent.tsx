'use client';

import { locations } from '../../mock/embassyExchange';
import { PlaceCard } from '../ui/PlaceCard';

// 임시
export function ExchangeContent() {
  return (
    <>
      <p>환전소 바텀시트 내부 내용</p>
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
