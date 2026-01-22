'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type Place = {
  id: number;
  name: string;
  address: string;
};

type NaverMapProps = {
  onMarkerClick: (place: Place) => void;
};

export const NaverMap = forwardRef(function NaverMap(
  { onMarkerClick }: NaverMapProps,
  ref,
) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onMarkerClickRef = useRef(onMarkerClick);

  const isMountedRef = useRef(true);

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const NAVER_MAP_SCRIPT_URL =
      'https://oapi.map.naver.com/openapi/v3/maps.js';

    if (!NAVER_MAP_KEY || !containerRef.current) return;

    const initMap = () => {
      if (!isMountedRef.current) return;
      if (mapRef.current) return;

      const { naver } = window;
      if (!naver?.maps) return;

      const renderMap = (lat: number, lng: number) => {
        if (!isMountedRef.current || !containerRef.current) return;

        const center = new naver.maps.LatLng(lat, lng);

        const map = new naver.maps.Map(containerRef.current, {
          center,
          zoom: 14,
          logoControl: false,
        });

        mapRef.current = map;

        const marker = new naver.maps.Marker({
          position: center,
          map,
          icon: {
            content: `
              <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            `,
            anchor: new naver.maps.Point(8, 8),
          },
        });

        naver.maps.Event.addListener(marker, 'click', () => {
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
        : existingScript.addEventListener('load', initMap, {
            once: true,
          });
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-map-script';
    script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
    script.async = true;
    script.onload = initMap;

    document.head.appendChild(script);
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
