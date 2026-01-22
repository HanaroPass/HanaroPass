'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { SavedPlace } from '../../mock/savedPlaces';
import type { HospitalPlace } from '../../mock/hospitalMap.mock';

type NaverMapProps = {
  onMarkerClick: (place: HospitalPlace | SavedPlace) => void;
  savedPlaces?: SavedPlace[];
  showBookmarks?: boolean;
  hospitals?: HospitalPlace[];
  activeCategory?: 'hospital' | 'embassy' | 'exchange' | null;
};

export const NaverMap = forwardRef(function NaverMap(
  {
    onMarkerClick,
    savedPlaces,
    showBookmarks,
    hospitals,
    activeCategory,
  }: NaverMapProps,
  ref,
) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const onMarkerClickRef = useRef(onMarkerClick);
  const isMountedRef = useRef(true);
  const [isMapReady, setIsMapReady] = useState(false);

  /** 최신 onMarkerClick 유지 */
  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;

    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    const map = mapRef.current;
    const { naver } = window;

    /** 🏥 병원 마커 */
    if (activeCategory === 'hospital' && hospitals) {
      hospitals.forEach((hospital) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            Number(hospital.latitude),
            Number(hospital.longitude),
          ),
          map,
          icon: {
            content: `
<div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
  <div class="w-4 h-4 bg-[#F9FAFB] rounded-full flex items-center justify-center shadow-inner">
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="#F43F5E" 
        stroke-width="4.5" 
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</div>
            `,
            anchor: new naver.maps.Point(14, 14),
          },
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          onMarkerClickRef.current(hospital);
        });

        markersRef.current.push(marker);
      });
    }

    /** ⭐ 북마크 마커 */
    if (showBookmarks && savedPlaces) {
      savedPlaces.forEach((place) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            Number(place.latitude),
            Number(place.longitude),
          ),
          map,
          icon: {
            content: `
              <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                <div class="w-4 h-4 bg-hana-green rounded-full flex items-center justify-center shadow-inner text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5C5 3.34315 6.34315 2 8 2H16C17.6569 2 19 3.34315 19 5V22L12 19L5 22V5Z" />
                  </svg>
                </div>
              </div>
            `,
            anchor: new naver.maps.Point(14, 14),
          },
        });

        naver.maps.Event.addListener(marker, 'click', () => {
          onMarkerClickRef.current(place);
        });

        markersRef.current.push(marker);
      });
    }
  }, [isMapReady, activeCategory, hospitals, savedPlaces, showBookmarks]);

  /** 지도 초기화 */
  useEffect(() => {
    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    if (!NAVER_MAP_KEY || !containerRef.current) return;

    const initMap = () => {
      if (!isMountedRef.current || mapRef.current) return;
      if (!window.naver?.maps) return;

      const renderMap = (lat: number, lng: number) => {
        if (!containerRef.current) return;

        const center = new window.naver.maps.LatLng(lat, lng);
        const map = new window.naver.maps.Map(containerRef.current, {
          center,
          zoom: 15,
          logoControl: false,
        });

        mapRef.current = map;
        setIsMapReady(true);

        // 🔵 내 위치 마커
        new window.naver.maps.Marker({
          position: center,
          map,
          icon: {
            content: `
              <div style="
                width:10px;
                height:10px;
                border-radius:50%;
                background:#2563eb;
                border:2px solid white;
                box-shadow:0 2px 6px rgba(0,0,0,0.3);
              "></div>
            `,
            anchor: new window.naver.maps.Point(5, 5),
          },
        });
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
        () => renderMap(37.5445, 127.0557),
      );
    };

    const existing = document.getElementById('naver-map-script');

    if (existing) {
      window.naver?.maps
        ? initMap()
        : existing.addEventListener('load', initMap, { once: true });
    } else {
      const script = document.createElement('script');
      script.id = 'naver-map-script';
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_KEY}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /** 외부에서 내 위치로 이동 */
  useImperativeHandle(ref, () => ({
    centerToMyPosition: () => {
      if (!mapRef.current) return;

      navigator.geolocation.getCurrentPosition((pos) => {
        const center = new window.naver.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        mapRef.current?.panTo(center);
      });
    },
  }));

  return <div ref={containerRef} className="h-full w-full" />;
});
