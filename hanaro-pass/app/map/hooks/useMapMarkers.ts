'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { NaverSearchResult } from '../components/ui/NaverMap';
import { MARKER_ICONS } from '../constants/map';
import type { Embassy } from '../mock/embassyExchange';
import type { HospitalPlace } from '../mock/hospitalMap.mock';
import type { SavedPlace } from '../mock/savedPlaces';

export type ClickablePlace =
  | SavedPlace
  | Embassy
  | NaverSearchResult
  | HospitalPlace;

type UseMapMarkersProps = {
  map: naver.maps.Map | null;
  isMapReady: boolean;
  hospitals?: HospitalPlace[];
  savedPlaces?: SavedPlace[];
  embassyData?: Embassy;
  exchangeResults?: NaverSearchResult[];
  showBookmarks?: boolean;
  showEmbassy?: boolean;
  showExchanges?: boolean;
  activeCategory?: string | null;
  onMarkerClick: (place: ClickablePlace) => void;
};

export function useMapMarkers({
  map,
  isMapReady,
  hospitals,
  savedPlaces,
  embassyData,
  exchangeResults,
  showBookmarks,
  showEmbassy,
  showExchanges,
  activeCategory,
  onMarkerClick,
}: UseMapMarkersProps) {
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const exchangeMarkersRef = useRef<naver.maps.Marker[]>([]);
  const currentExchangeKeyRef = useRef<string>('');

  const createMarker = useCallback(
    (lat: number, lng: number, iconHtml: string, onClick: () => void) => {
      if (!map) {
        return null;
      }
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
          content: iconHtml,
          anchor: new window.naver.maps.Point(10, 10),
        },
      });
      window.naver.maps.Event.addListener(marker, 'click', onClick);
      return marker;
    },
    [map],
  );

  // 일반 마커 (병원, 대사관, 북마크)
  useEffect(() => {
    if (!isMapReady || !map) {
      return;
    }

    markersRef.current.forEach((m) => {
      m.setMap(null);
    });
    markersRef.current = [];
    const newMarkers: naver.maps.Marker[] = [];

    if (showBookmarks && savedPlaces) {
      savedPlaces.forEach((p) => {
        const m = createMarker(
          Number(p.latitude),
          Number(p.longitude),
          MARKER_ICONS.bookmark,
          () => {
            onMarkerClick(p);
          },
        );
        if (m) {
          newMarkers.push(m);
        }
      });
    }
    if (showEmbassy && embassyData) {
      const m = createMarker(
        embassyData.latitude,
        embassyData.longitude,
        MARKER_ICONS.embassy,
        () => {
          onMarkerClick(embassyData);
        },
      );
      if (m) {
        newMarkers.push(m);
      }
    }
    if (activeCategory === 'hospital' && hospitals) {
      hospitals.forEach((h) => {
        const m = createMarker(
          Number(h.latitude),
          Number(h.longitude),
          MARKER_ICONS.hospital,
          () => {
            onMarkerClick(h);
          },
        );
        if (m) {
          newMarkers.push(m);
        }
      });
    }
    markersRef.current = newMarkers;

    if (!showExchanges) {
      exchangeMarkersRef.current.forEach((m) => {
        m.setMap(null);
      });
      exchangeMarkersRef.current = [];
      currentExchangeKeyRef.current = '';
    }
  }, [
    isMapReady,
    map,
    showBookmarks,
    showEmbassy,
    activeCategory,
    savedPlaces,
    embassyData,
    hospitals,
    showExchanges,
    createMarker,
    onMarkerClick,
  ]);

  // 환전소 마커 (비동기 일괄 렌더링)
  useEffect(() => {
    if (
      !isMapReady ||
      !showExchanges ||
      !exchangeResults ||
      exchangeResults.length === 0
    ) {
      return;
    }

    const resultsKey = JSON.stringify(exchangeResults);
    if (
      currentExchangeKeyRef.current === resultsKey &&
      exchangeMarkersRef.current.length > 0
    ) {
      return;
    }

    exchangeMarkersRef.current.forEach((m) => {
      m.setMap(null);
    });
    exchangeMarkersRef.current = [];
    currentExchangeKeyRef.current = resultsKey;

    const geocodePromises = exchangeResults.map((result) => {
      const addr = result.roadAddress || result.address;
      if (!addr) {
        return Promise.resolve(null);
      }
      return new Promise<{
        lat: number;
        lng: number;
        data: NaverSearchResult;
      } | null>((resolve) => {
        window.naver.maps.Service.geocode(
          { query: addr },
          (status, response) => {
            if (
              status === window.naver.maps.Service.Status.OK &&
              response.v2.addresses.length > 0
            ) {
              const item = response.v2.addresses[0];
              resolve({
                lat: Number(item.y),
                lng: Number(item.x),
                data: result,
              });
            } else {
              resolve(null);
            }
          },
        );
      });
    });

    Promise.all(geocodePromises).then((results) => {
      if (!showExchanges || currentExchangeKeyRef.current !== resultsKey) {
        return;
      }
      const newMarkers: naver.maps.Marker[] = [];
      results.forEach((res) => {
        if (!res) {
          return;
        }
        const m = createMarker(res.lat, res.lng, MARKER_ICONS.exchange, () => {
          onMarkerClick({
            ...res.data,
            name: res.data.title.replace(/<[^>]*>?/g, ''),
            type: '환전소',
          });
        });
        if (m) {
          newMarkers.push(m);
        }
      });
      exchangeMarkersRef.current = newMarkers;
    });
  }, [isMapReady, showExchanges, exchangeResults, createMarker, onMarkerClick]);
}
