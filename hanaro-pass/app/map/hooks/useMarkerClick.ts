import { useCallback } from 'react';
import type { Embassy, SavedPlace } from '@/lib/generated/prisma';

import type { NaverSearchResult } from '../components/ui/NaverMap';
import type { Hospital } from '../mapPageClient';
import {
  isEmbassy,
  isExchangePlace,
  isHospitalPlace,
  isSavedPlace,
} from '../utils/mapUtils';
import type { ClickablePlace } from './useMapMarkers';

type SheetType = 'hospital' | 'embassy' | 'exchange' | 'bookmark' | 'siren';

type UseMarkerClickProps = {
  selectedPlace: SavedPlace | Embassy | NaverSearchResult | null;
  selectedHospital: Hospital | null;
  setSelectedPlace: (
    place: SavedPlace | Embassy | NaverSearchResult | null,
  ) => void;
  setSelectedHospital: (hospital: Hospital | null) => void;
  toggleSheet: (type: SheetType, open?: boolean) => void;
};

export function useMarkerClick({
  selectedPlace,
  selectedHospital,
  setSelectedPlace,
  setSelectedHospital,
  toggleSheet,
}: UseMarkerClickProps) {
  const handleMarkerClick = useCallback(
    (place: ClickablePlace) => {
      // 병원
      if (isHospitalPlace(place)) {
        setSelectedPlace(null);

        if (selectedHospital?.id === place.id) {
          setSelectedHospital(null);
          toggleSheet('hospital');
        } else {
          setSelectedHospital(place);
          toggleSheet('hospital', true);
        }
        return;
      }

      // 대사관
      if (isEmbassy(place)) return;

      // 환전소
      if (isExchangePlace(place)) {
        const isSame =
          selectedPlace &&
          'mapx' in selectedPlace &&
          'mapy' in selectedPlace &&
          selectedPlace.mapx === place.mapx &&
          selectedPlace.mapy === place.mapy;
        if (isSame) {
          toggleSheet('exchange');
          setSelectedPlace(null);
        } else {
          setSelectedPlace(place);
          setSelectedHospital(null);
          toggleSheet('exchange', true);
        }
        return;
      }

      // 4. 즐겨찾기(북마크)
      if (isSavedPlace(place)) {
        const isSame =
          selectedPlace &&
          'id' in selectedPlace &&
          selectedPlace.id === place.id;
        if (isSame) {
          setSelectedPlace(null);
          toggleSheet('bookmark');
        } else {
          setSelectedPlace(place);
          setSelectedHospital(null);
          toggleSheet('bookmark', true);
        }
      }
    },
    [
      selectedPlace,
      selectedHospital,
      setSelectedPlace,
      setSelectedHospital,
      toggleSheet,
    ],
  );

  return { handleMarkerClick };
}
