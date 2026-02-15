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

  const getNaverMaps = useCallback(() => {
    if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
      return window.naver.maps;
    }
    return null;
  }, []);

  const createMarker = useCallback(
    (lat: number, lng: number, iconHtml: string, onClick: () => void) => {
      const naverMaps = getNaverMaps();
      if (!map || !naverMaps) return null;

      const marker = new naverMaps.Marker({
        position: new naverMaps.LatLng(lat, lng),
        map,
        icon: {
          content: iconHtml,
          anchor: new naverMaps.Point(10, 10),
        },
      });
      naverMaps.Event.addListener(marker, 'click', onClick);
      return marker;
    },
    [map, getNaverMaps],
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
    const naverMaps = getNaverMaps();
    if (!isMapReady || !map || !naverMaps) return;

    const currentMarkersMap = exchangeMarkersRef.current;

    currentMarkersMap.forEach((marker) => {
      if (marker.getMap() !== map) marker.setMap(map);
    });

    if (!showExchanges || !exchangeResults || exchangeResults.length === 0) {
      currentMarkersMap.forEach((m) => {
        m.setMap(null);
      });
      currentMarkersMap.clear();
      return;
    }

    const activeKeys = new Set<string>();
    exchangeResults.forEach((result) => {
      const markerKey = `${result.mapx}-${result.mapy}`;
      activeKeys.add(markerKey);

      const existingMarker = currentMarkersMap.get(markerKey);
      if (existingMarker) {
        naverMaps.Event.clearInstanceListeners(existingMarker);
        naverMaps.Event.addListener(existingMarker, 'click', () => {
          const clickData = {
            ...result,
            name: result.title.replace(/<[^>]*>?/g, ''),
            type: getExchangeType(result.title),
          };
          onMarkerClick(clickData);
        });
        return;
      }

      const lat = Number(result.mapy) / 10000000;
      const lng = Number(result.mapx) / 10000000;

      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        const marker = createMarker(lat, lng, MARKER_ICONS.exchange, () => {
          const clickData = {
            ...result,
            name: result.title.replace(/<[^>]*>?/g, ''),
            type: getExchangeType(result.title),
          };
          onMarkerClick(clickData);
        });
        if (marker) currentMarkersMap.set(markerKey, marker);
      }
    });

    currentMarkersMap.forEach((marker, key) => {
      if (!activeKeys.has(key)) {
        marker.setMap(null);
        currentMarkersMap.delete(key);
      }
    });
  }, [
    isMapReady,
    map,
    showExchanges,
    exchangeResults,
    createMarker,
    onMarkerClick,
    getNaverMaps,
  ]);
}
