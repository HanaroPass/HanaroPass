"use client";

import { useEffect, useRef } from "react";

type Place = {
  id: number;
  name: string;
  address: string;
};

type NaverMapProps = {
  onMarkerClick: (place: Place) => void;
};

export function NaverMap({ onMarkerClick }: NaverMapProps) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const NAVER_MAP_SCRIPT_URL =
      "https://oapi.map.naver.com/openapi/v3/maps.js";

    if (!NAVER_MAP_KEY || !containerRef.current) return;

    const initMap = () => {
      if (mapRef.current) return;
      const { naver } = window;
      if (!naver?.maps) return;

      const renderMap = (lat: number, lng: number) => {
        const center = new naver.maps.LatLng(lat, lng);

        const map = new naver.maps.Map(containerRef.current!, {
          center,
          zoom: 14,
          logoControl: false,
        });

        mapRef.current = map;

        const marker = new naver.maps.Marker({
          position: center,
          map,
          icon: {
            content: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>`,
            anchor: new naver.maps.Point(8, 8),
          },
        });

        naver.maps.Event.addListener(marker, "click", () => {
          onMarkerClickRef.current({
            id: 1,
            name: "내 위치",
            address: "현재 위치",
          });
        });
      };

      navigator.geolocation.getCurrentPosition(
        (p) => renderMap(p.coords.latitude, p.coords.longitude),
        () => renderMap(37.5445, 127.0557),
        { enableHighAccuracy: true, timeout: 10000 },
      );
    };

    const existing = document.getElementById("naver-map-script");
    if (existing) {
      window.naver?.maps
        ? initMap()
        : existing.addEventListener("load", initMap, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "naver-map-script";
    script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
    script.async = true;
    script.onload = initMap;

    document.head.appendChild(script);
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
