'use client';

import { type LocationInfo, PlaceCard } from '../ui/PlaceCard';

interface ExchangeContentProps {
  results: LocationInfo[];
}

export function ExchangeContent({ results }: ExchangeContentProps) {
  return (
    <div className="flex flex-col">
      {results.map((item, idx) => {
        const isLast = idx === results.length - 1;

        return (
          <div
            key={item.id || idx}
            className={`px-2 ${!isLast ? 'border-gray-100 border-b' : ''}`}
          >
            <PlaceCard data={item} />
          </div>
        );
      })}
    </div>
  );
}
