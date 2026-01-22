'use client';

import { MAP_EXCHANGE_MOCK } from '../../mock/embassyExchange';
import { PlaceCard } from '../ui/PlaceCard';

export function ExchangeContent() {
  return (
    <div className="flex flex-col px-2">
      {MAP_EXCHANGE_MOCK.map((loc, index) => (
        <div
          key={`${loc.name}-${index}`}
          className={
            index !== MAP_EXCHANGE_MOCK.length - 1
              ? 'border-gray-100 border-b'
              : ''
          }
        >
          <div className="p-4">
            <PlaceCard data={loc} />
          </div>
        </div>
      ))}
    </div>
  );
}
