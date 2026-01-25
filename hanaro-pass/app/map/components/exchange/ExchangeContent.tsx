'use client';

import { MapPinOff, X } from 'lucide-react';
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
      <div className="relative flex flex-col px-2">
        <button
          type="button"
          onClick={onBackToList}
          className="absolute top-0 right-4 z-10 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="목록으로 나가기"
        >
          <X width={20} height={20} />
        </button>
        <div className="mt-1">
          <PlaceCard data={selectedPlace} />
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-5 text-gray-400">
        <MapPinOff className="mb-3 h-10 w-10 opacity-80" />
        <p className="font-medium text-sm">주변에 환전소가 없습니다.</p>
        <p className="mt-1 text-xs">다른 지역으로 지도를 옮겨보세요.</p>
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
