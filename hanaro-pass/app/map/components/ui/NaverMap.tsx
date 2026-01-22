'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { SavedPlace } from '../../mock/savedPlaces';

type Place = {
  id: number;
  name: string;
  address: string;
};

type NaverMapProps = {
  onMarkerClick: (place: Place | SavedPlace) => void;
  savedPlaces?: SavedPlace[];
  showBookmarks?: boolean;
};

export const NaverMap = forwardRef(function NaverMap(
  { onMarkerClick, savedPlaces, showBookmarks }: NaverMapProps,
  ref,
) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const onMarkerClickRef = useRef(onMarkerClick);
  const isMountedRef = useRef(true);

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    const currentMap = mapRef.current;

    if (showBookmarks && savedPlaces && currentMap) {
      const { naver } = window;
      savedPlaces.forEach((place) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            Number(place.latitude),
            Number(place.longitude),
          ),
          map: currentMap,
          icon: {
            content: `
              <div class="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                <div class="w-6 h-6 bg-hana-green rounded-full flex items-center justify-center shadow-inner">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));"
                >
                  <path d="M5 5C5 3.34315 6.34315 2 8 2H16C17.6569 2 19 3.34315 19 5V22L12 19L5 22V5Z" />
                </svg>
              </div>
            </div>
          `,
            anchor: new naver.maps.Point(14, 14),
          },
        });
        naver.maps.Event.addListener(marker, 'click', () => {
          onMarkerClick(place);
        });

        markersRef.current.push(marker);
      });
    }
  }, [showBookmarks, savedPlaces, onMarkerClick]);

  useEffect(() => {
    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const NAVER_MAP_SCRIPT_URL =
      'https://oapi.map.naver.com/openapi/v3/maps.js';

    if (!NAVER_MAP_KEY || !containerRef.current) return;

    const initMap = () => {
      if (!isMountedRef.current || mapRef.current) return;

      const { naver } = window;
      if (!naver?.maps) return;

      const renderMap = (lat: number, lng: number) => {
        if (!isMountedRef.current || !containerRef.current) return;

        const center = new naver.maps.LatLng(lat, lng);

        const map = new naver.maps.Map(containerRef.current, {
          center,
          zoom: 15,
          logoControl: false,
        });

        mapRef.current = map;

        const myMarker = new naver.maps.Marker({
          position: center,
          map,
          icon: {
            content: `
              <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            `,
            anchor: new naver.maps.Point(8, 8),
          },
        });

        naver.maps.Event.addListener(myMarker, 'click', () => {
          onMarkerClickRef.current({
            id: 1,
            name: '내 위치',
            address: '현재 위치',
          });
        });
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
        // fallback: 성수역
        () => renderMap(37.5445, 127.0557),
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    };

    const existingScript = document.getElementById(
      'naver-map-script',
    ) as HTMLScriptElement | null;

    if (existingScript) {
      window.naver?.maps
        ? initMap()
        : existingScript.addEventListener('load', initMap, { once: true });
    } else {
      const script = document.createElement('script');
      script.id = 'naver-map-script';
      script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
      script.async = true;
      script.onload = initMap;

      document.head.appendChild(script);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    centerToMyPosition: () => {
      if (!mapRef.current) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newCenter = new naver.maps.LatLng(latitude, longitude);
          mapRef.current?.panTo(newCenter);
        },
        () => {},
      );
    },
  }));
  return <div ref={containerRef} className="h-full w-full" />;
});
