'use client';

import { ChevronLeft } from 'lucide-react';
import { type LocationInfo, PlaceCard } from '../ui/PlaceCard';

interface ExchangeContentProps {
  results: LocationInfo[];
  selectedPlace: LocationInfo | null;
  onBackToList: () => void;
}

export function ExchangeContent({
  results,
  selectedPlace,
  onBackToList,
}: ExchangeContentProps) {
  if (selectedPlace) {
    return (
      <div className="flex flex-col px-2">
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBackToList}
            className="flex items-center gap-1 font-medium text-gray-600 text-sm transition-colors"
          >
            <ChevronLeft width={18} height={18} />
            <span>목록으로</span>
          </button>
        </div>
        <PlaceCard data={selectedPlace} />
      </div>
    );
  }

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
