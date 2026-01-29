'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { Embassy, SavedPlace } from '@/lib/generated/prisma';

import type { NaverSearchResult } from '../components/ui/NaverMap';
import { MARKER_ICONS } from '../constants/map';
import { getExchangeType } from '../utils/mapUtils';
import type { Hospital } from './useHospitalFilters';

export type ClickablePlace =
  | SavedPlace
  | Embassy
  | NaverSearchResult
  | Hospital;

type UseMapMarkersProps = {
  map: naver.maps.Map | null;
  isMapReady: boolean;
  hospitals?: Hospital[];
  savedPlaces?: SavedPlace[];
  embassyData?: Embassy[];
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
  const bookmarkMarkersRef = useRef<naver.maps.Marker[]>([]);
  const embassyMarkersRef = useRef<naver.maps.Marker[]>([]);
  const hospitalMarkersRef = useRef<naver.maps.Marker[]>([]);

  const exchangeMarkersRef = useRef<Map<string, naver.maps.Marker>>(new Map());

  const createMarker = useCallback(
    (lat: number, lng: number, iconHtml: string, onClick: () => void) => {
      if (!map) return null;
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

  // 북마크 마커 관리
  useEffect(() => {
    if (!isMapReady || !map) return;

    bookmarkMarkersRef.current.forEach((m) => {
      m.setMap(null);
    });
    bookmarkMarkersRef.current = [];

    if (showBookmarks && savedPlaces) {
      bookmarkMarkersRef.current = savedPlaces
        .map((p) =>
          createMarker(
            Number(p.latitude),
            Number(p.longitude),
            MARKER_ICONS.bookmark,
            () => onMarkerClick(p),
          ),
        )
        .filter((m): m is naver.maps.Marker => m !== null);
    }
  }, [
    isMapReady,
    map,
    showBookmarks,
    savedPlaces,
    createMarker,
    onMarkerClick,
  ]);

  // 대사관 마커 관리
  useEffect(() => {
    if (!isMapReady || !map) return;

    embassyMarkersRef.current.forEach((m) => {
      m.setMap(null);
    });
    embassyMarkersRef.current = [];

    if (showEmbassy && embassyData) {
      embassyData.forEach((embassy) => {
        const lat = parseFloat(embassy.latitude);
        const lng = parseFloat(embassy.longitude);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        const m = createMarker(lat, lng, MARKER_ICONS.embassy, () =>
          onMarkerClick(embassy),
        );

        if (m) embassyMarkersRef.current.push(m);
      });
    }
  }, [isMapReady, map, showEmbassy, embassyData, createMarker, onMarkerClick]);

  // 병원 마커 관리
  useEffect(() => {
    if (!isMapReady || !map) return;

    hospitalMarkersRef.current.forEach((m) => {
      m.setMap(null);
    });
    hospitalMarkersRef.current = [];

    if (activeCategory === 'hospital' && hospitals) {
      hospitalMarkersRef.current = hospitals
        .map((h) =>
          createMarker(
            Number(h.latitude),
            Number(h.longitude),
            MARKER_ICONS.hospital,
            () => onMarkerClick(h),
          ),
        )
        .filter((m): m is naver.maps.Marker => m !== null);
    }
  }, [isMapReady, map, activeCategory, hospitals, createMarker, onMarkerClick]);

  // 환전소 마커 관리
  useEffect(() => {
    let cancelled = false;

    if (!isMapReady || !map) return;

    if (!showExchanges || !exchangeResults || exchangeResults.length === 0) {
      exchangeMarkersRef.current.forEach((m) => {
        m.setMap(null);
      });
      exchangeMarkersRef.current.clear();
      return;
    }

    const currentMarkersMap = exchangeMarkersRef.current;
    const activeKeys = new Set<string>();
    const seenKeys = new Set<string>();
    const pendingResults = exchangeResults.filter((result) => {
      const markerKey = `${result.mapx}-${result.mapy}`;
      if (seenKeys.has(markerKey)) return false;
      seenKeys.add(markerKey);
      activeKeys.add(markerKey);
      return !currentMarkersMap.has(markerKey);
    });

    if (pendingResults.length > 0) {
      const geocodePromises = pendingResults.map((result) => {
        const addr = result.roadAddress || result.address;
        if (!addr) return Promise.resolve(null);

        return new Promise<{
          lat: number;
          lng: number;
          result: NaverSearchResult;
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
                  result,
                });
              } else {
                resolve(null);
              }
            },
          );
        });
      });

      Promise.all(geocodePromises).then((validResults) => {
        if (cancelled || !showExchanges || !map) return;

        validResults.forEach((item) => {
          if (!item) return;
          const { lat, lng, result } = item;
          const markerKey = `${result.mapx}-${result.mapy}`;

          if (!activeKeys.has(markerKey)) return;

          const marker = createMarker(lat, lng, MARKER_ICONS.exchange, () => {
            const clickData: NaverSearchResult & {
              name: string;
              type: string;
            } = {
              ...result,
              name: result.title.replace(/<[^>]*>?/g, ''),
              type: getExchangeType(result.title),
            };
            onMarkerClick(clickData);
          });

          if (marker) {
            currentMarkersMap.set(markerKey, marker);
          }
        });
      });
    }
    currentMarkersMap.forEach((marker, key) => {
      if (!activeKeys.has(key)) {
        marker.setMap(null);
        currentMarkersMap.delete(key);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    isMapReady,
    map,
    showExchanges,
    exchangeResults,
    createMarker,
    onMarkerClick,
  ]);
}
