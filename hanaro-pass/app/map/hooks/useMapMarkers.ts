'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { Embassy } from '@/lib/generated/prisma';
import type { NaverSearchResult } from '../components/ui/NaverMap';
import { MARKER_ICONS } from '../constants/map';
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
  // 카테고리별 마커 저장소 분리
  const bookmarkMarkersRef = useRef<naver.maps.Marker[]>([]);
  const embassyMarkersRef = useRef<naver.maps.Marker[]>([]);
  const hospitalMarkersRef = useRef<naver.maps.Marker[]>([]);
  const exchangeMarkersRef = useRef<naver.maps.Marker[]>([]);
  const currentExchangeKeyRef = useRef('');

  // 마커 생성 공통 함수
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
        const lat = Number(embassy.latitude);
        const lng = Number(embassy.longitude);

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
    if (!isMapReady || !map) return;

    // 취소 플래그
    let cancelled = false;

    if (!showExchanges || !exchangeResults || exchangeResults.length === 0) {
      exchangeMarkersRef.current.forEach((m) => {
        m.setMap(null);
      });
      exchangeMarkersRef.current = [];
      currentExchangeKeyRef.current = '';
      return;
    }

    const resultsKey = JSON.stringify(exchangeResults);
    if (
      currentExchangeKeyRef.current === resultsKey &&
      exchangeMarkersRef.current.length > 0
    ) {
      return;
    }

    // 기존 환전소 마커만 제거
    exchangeMarkersRef.current.forEach((m) => {
      m.setMap(null);
    });
    exchangeMarkersRef.current = [];
    currentExchangeKeyRef.current = resultsKey;

    const geocodePromises = exchangeResults.map((result) => {
      const addr = result.roadAddress || result.address;
      if (!addr) return Promise.resolve(null);
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
      // 데이터가 왔을 때 이미 이펙트가 끝났다면 무시
      if (
        cancelled ||
        !showExchanges ||
        currentExchangeKeyRef.current !== resultsKey
      )
        return;

      exchangeMarkersRef.current = results
        .map((res) => {
          if (!res) return null;
          return createMarker(res.lat, res.lng, MARKER_ICONS.exchange, () => {
            onMarkerClick({
              ...res.data,
              name: res.data.title.replace(/<[^>]*>?/g, ''),
              type: '환전소',
            });
          });
        })
        .filter((m): m is naver.maps.Marker => m !== null);
    });

    // 클린업 함수에서 플래그를 true로 변경
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
