'use client';

import type { SavedPlace } from '@/lib/generated/prisma';
import { mapDbToInfo } from '../../utils/mapUtils';
import { PlaceCard } from '../ui/PlaceCard';

type BookmarkContentProps = {
  data: SavedPlace;
  userCoords?: { lat: number; lng: number };
  lang: 'ko' | 'en';
};

export function BookmarkContent({
  data,
  userCoords,
  lang,
}: BookmarkContentProps) {
  const localizedData = mapDbToInfo(data, lang);

  return (
    <div className="px-2">
      <PlaceCard data={localizedData} userCoords={userCoords} lang={lang} />
    </div>
  );
}
