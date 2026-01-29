'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useToast } from '@/hooks/useToast';
import type { Embassy, SavedPlace } from '@/lib/generated/prisma';
import type { Hospital } from '../../hooks/useHospitalFilters';
import { type ClickablePlace, useMapMarkers } from '../../hooks/useMapMarkers';
import { useNaverMapInit } from '../../hooks/useNaverMapInit';
import type { MapBounds } from '../../types/map';

export type NaverSearchResult = {
  title: string;
  roadAddress: string;
  address?: string;
  telephone: string;
  mapx: string;
  mapy: string;
  category?: string;
  name?: string;
  type?: string;
};

type NaverMapProps = {
  onMarkerClick: (place: ClickablePlace) => void;
  onMapMoved?: (address: string, bounds?: MapBounds) => void;
  savedPlaces?: SavedPlace[];
  embassyData?: Embassy[];
  exchangeResults?: NaverSearchResult[];
  showBookmarks?: boolean;
  hospitals?: Hospital[];
  activeCategory?: 'hospital' | 'embassy' | 'exchange' | null;
  showEmbassy?: boolean;
  showExchanges?: boolean;
};

export type NaverMapHandle = {
  centerToMyPosition: () => void;
  panToLocation: (lat: number, lng: number) => void;
};

export const NaverMap = forwardRef<NaverMapHandle, NaverMapProps>(
  (props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { warning } = useToast();

    // 지도 초기화 훅
    const { mapRef, isMapReady } = useNaverMapInit(
      containerRef,
      props.onMapMoved,
    );

    // 마커 관리 훅
    useMapMarkers({
      map: mapRef.current,
      isMapReady,
      ...props,
    });

    // 외부 노출 메서드
    useImperativeHandle(ref, () => ({
      centerToMyPosition: () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const map = mapRef.current;
            if (!map || !isMapReady) return;

            const actualCoord = new window.naver.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude,
            );

            const proj = map.getProjection();
            const offsetPoint = proj.fromCoordToOffset(actualCoord);
            offsetPoint.y += 150;
            const finalCoord = proj.fromOffsetToCoord(offsetPoint);

            map.panTo(finalCoord, { duration: 500, easing: 'easeOutCubic' });
          },
          () => {
            warning('내 위치를 찾으려면 위치 권한을 허용해주세요.');
          },
        );
      },
      panToLocation: (lat, lng) => {
        const map = mapRef.current;
        if (!map || !isMapReady) return;

        const actualCoord = new window.naver.maps.LatLng(lat, lng);
        const proj = map.getProjection();
        const offsetPoint = proj.fromCoordToOffset(actualCoord);
        offsetPoint.y += 150;
        const finalCoord = proj.fromOffsetToCoord(offsetPoint);

        map.panTo(finalCoord, { duration: 500, easing: 'easeOutCubic' });
      },
    }));

    return <div ref={containerRef} className="h-full w-full" />;
  },
);
