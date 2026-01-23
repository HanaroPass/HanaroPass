'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  DEFAULT_COORDS,
  MARKER_ICONS,
  NAVER_MAP_SCRIPT_URL,
} from '../../constants/map';
import type { Embassy } from '../../mock/embassyExchange';
import type { HospitalPlace } from '../../mock/hospitalMap.mock';
import type { SavedPlace } from '../../mock/savedPlaces';

type Place = {
  id: number;
  name: string;
  address: string;
};

export type NaverSearchResult = {
  title: string;
  roadAddress: string;
  address: string;
  telephone: string;
  mapx: string;
  mapy: string;
  category?: string;
};

type NaverMapProps = {
  onMarkerClick: (
    place: Place | HospitalPlace | SavedPlace | Embassy | NaverSearchResult,
  ) => void;
  savedPlaces?: SavedPlace[];
  embassyData?: Embassy;
  exchangeResults?: NaverSearchResult[];
  showBookmarks?: boolean;
  hospitals?: HospitalPlace[];
  activeCategory?: 'hospital' | 'embassy' | 'exchange' | null;
  showEmbassy?: boolean;
  showExchanges?: boolean;
};

export type NaverMapHandle = {
  centerToMyPosition: () => void;
  panToLocation: (lat: number, lng: number) => void;
};

//마커를 화면 상단에 위치시키기 위한 위도 오프셋
const LATITUDE_OFFSET = -0.004;

export const NaverMap = forwardRef<NaverMapHandle, NaverMapProps>(
  (props, ref) => {
    const {
      onMarkerClick,
      savedPlaces,
      embassyData,
      showBookmarks,
      showEmbassy,
      hospitals,
      activeCategory,
    } = props;

    const mapRef = useRef<naver.maps.Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<naver.maps.Marker[]>([]);
    const onMarkerClickRef = useRef(onMarkerClick);
    const [isMapReady, setIsMapReady] = useState(false);

    // 최신 콜백 유지를 위한 Ref 업데이트
    useEffect(() => {
      onMarkerClickRef.current = onMarkerClick;
    }, [onMarkerClick]);

    // 오프셋을 적용하여 지도를 이동시키는 함수
    const panToWithOffset = useCallback((lat: number, lng: number) => {
      if (!mapRef.current) return;
      const { naver } = window;
      const centerWithOffset = new naver.maps.LatLng(
        lat + LATITUDE_OFFSET,
        lng,
      );
      mapRef.current.panTo(centerWithOffset);
    }, []);

    // 마커 생성 공통 헬퍼
    const createMarker = useCallback(
      (lat: number, lng: number, iconHtml: string, onClick: () => void) => {
        if (!mapRef.current) return null;
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: mapRef.current,
          icon: { content: iconHtml, anchor: new naver.maps.Point(10, 10) },
        });
        naver.maps.Event.addListener(marker, 'click', onClick);
        return marker;
      },
      [],
    );

    // 마커 렌더링 로직
    useEffect(() => {
      if (!isMapReady || !mapRef.current) return;

      // 기존 마커 모두 제거
      for (const m of markersRef.current) {
        m.setMap(null);
      }
      markersRef.current = [];
      const newMarkers: naver.maps.Marker[] = [];

      // 북마크 마커
      if (showBookmarks && savedPlaces) {
        for (const p of savedPlaces) {
          const m = createMarker(
            Number(p.latitude),
            Number(p.longitude),
            MARKER_ICONS.bookmark,
            () => onMarkerClickRef.current(p),
          );
          if (m) newMarkers.push(m);
        }
      }

      // 대사관 마커
      if (showEmbassy && embassyData) {
        const m = createMarker(
          embassyData.latitude,
          embassyData.longitude,
          MARKER_ICONS.embassy,
          () => onMarkerClickRef.current(embassyData),
        );
        if (m) newMarkers.push(m);
      }

      // 병원 마커
      if (activeCategory === 'hospital' && hospitals) {
        for (const h of hospitals) {
          const m = createMarker(
            Number(h.latitude),
            Number(h.longitude),
            MARKER_ICONS.hospital,
            () => onMarkerClickRef.current(h),
          );
          if (m) newMarkers.push(m);
        }
      }
      markersRef.current = newMarkers;
    }, [
      isMapReady,
      showBookmarks,
      showEmbassy,
      savedPlaces,
      embassyData,
      activeCategory,
      hospitals,
      createMarker,
    ]);

    // 지도 초기화 및 스크립트 로드
    useEffect(() => {
      const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
      if (!NAVER_MAP_KEY || !containerRef.current) return;

      const initMap = () => {
        const container = containerRef.current;
        if (!container || mapRef.current) return;

        const { naver } = window;
        const renderMap = (lat: number, lng: number) => {
          // 초기 렌더링 시에도 오프셋 적용 좌표를 센터로 설정
          const center = new naver.maps.LatLng(lat + LATITUDE_OFFSET, lng);

          const map = new naver.maps.Map(container, {
            center,
            zoom: 15,
            logoControl: false,
          });

          mapRef.current = map;
          setIsMapReady(true);

          // 내 위치 마커
          const myMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map,
            icon: {
              content: MARKER_ICONS.myLocation,
              anchor: new naver.maps.Point(8, 8),
            },
          });

          naver.maps.Event.addListener(myMarker, 'click', () =>
            onMarkerClickRef.current({
              id: 1,
              name: '내 위치',
              address: '현재 위치',
            }),
          );
        };

        navigator.geolocation.getCurrentPosition(
          (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
          // fallback: 성수역
          () => renderMap(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng),
          { enableHighAccuracy: true, timeout: 10000 },
        );
      };

      const scriptId = 'naver-map-script';
      const existingScript = document.getElementById(
        scriptId,
      ) as HTMLScriptElement;

      if (existingScript) {
        window.naver?.maps
          ? initMap()
          : existingScript.addEventListener('load', initMap);
      } else {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      centerToMyPosition: () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            panToWithOffset(pos.coords.latitude, pos.coords.longitude);
          },
          () => {
            panToWithOffset(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
          },
          { enableHighAccuracy: true, timeout: 10000 },
        );
      },
      panToLocation: (lat, lng) => panToWithOffset(lat, lng),
    }));

    return <div ref={containerRef} className="h-full w-full" />;
  },
);
