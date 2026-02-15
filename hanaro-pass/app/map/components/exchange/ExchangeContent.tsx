'use client';

import { MapPinOff, X } from 'lucide-react';
import type { LanguageType } from '../../types/map';
import { type LocationInfo, PlaceCard } from '../ui/PlaceCard';

type ExchangeContentProps = {
  results: LocationInfo[];
  selectedPlace: LocationInfo | null;
  onBackToList: () => void;
  lang: LanguageType;
};

export function ExchangeContent({
  results,
  selectedPlace,
  onBackToList,
  lang,
}: ExchangeContentProps) {
  if (selectedPlace) {
    return (
      <div className="relative flex flex-col px-2">
        <button
          type="button"
          onClick={onBackToList}
          className="absolute top-0 right-4 z-10 text-gray-400 transition-colors"
          aria-label={lang === 'ko' ? '목록으로 나가기 .' : 'Back to list'}
        >
          <X width={20} height={20} />
        </button>
        <div className="mt-1">
          <PlaceCard data={selectedPlace} lang={lang} />
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-5 text-gray-400">
        <MapPinOff className="mb-3 h-10 w-10 opacity-80" />
        <p className="font-medium text-sm">
          {lang === 'ko'
            ? '주변에 환전소가 없습니다.'
            : 'No exchange offices nearby.'}
        </p>
        <p className="mt-1 text-xs">
          {lang === 'ko'
            ? '다른 지역으로 지도를 옮겨보세요.'
            : 'Try moving the map to another area.'}
        </p>
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
            <PlaceCard data={item} lang={lang} />
          </div>
        );
      })}
    </div>
  );
}
