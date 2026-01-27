'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { Embassy, SavedPlace } from '@/lib/generated/prisma';

import { type ClickablePlace, useMapMarkers } from '../../hooks/useMapMarkers';
import { useNaverMapInit } from '../../hooks/useNaverMapInit';
import type { Hospital } from '../../mapPageClient';

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
  onMapMoved?: (address: string) => void;
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

    // 지도 초기화 훅
    const { mapRef, isMapReady, LATITUDE_OFFSET } = useNaverMapInit(
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
            mapRef.current?.panTo(
              new window.naver.maps.LatLng(
                pos.coords.latitude + LATITUDE_OFFSET,
                pos.coords.longitude,
              ),
            );
          },
          (error) => {
            console.error(
              '위치 정보를 가져오는데 실패했습니다:',
              error.message,
            );
            alert('위치 권한을 허용해주세요.');
          },
        );
      },
      panToLocation: (lat, lng) => {
        mapRef.current?.panTo(
          new window.naver.maps.LatLng(lat + LATITUDE_OFFSET, lng),
        );
      },
    }));

    return <div ref={containerRef} className="h-full w-full" />;
  },
);
