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

  useEffect(() => {
    if (document.getElementById("naver-map-script")) return;

    const script = document.createElement("script");
    script.id = "naver-map-script";

    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const NAVER_MAP_SCRIPT_URL =
      "https://oapi.map.naver.com/openapi/v3/maps.js";

    script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
    script.async = true;

    script.onload = () => {
      const { naver } = window;

      // 내 위치
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const center = new naver.maps.LatLng(latitude, longitude);

          const map = new naver.maps.Map("map", {
            center,
            zoom: 14,
            logoControl: false,
          });

          mapRef.current = map;

          // 내 위치 마커
          const marker = new naver.maps.Marker({
            position: center,
            map,
            icon: {
              content: `
                <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
              `,
              anchor: new naver.maps.Point(16, 16),
            },
          });

          const testPlace = {
            id: 1,
            name: "내 위치",
            address: "현재 위치",
          };

          naver.maps.Event.addListener(marker, "click", () => {
            onMarkerClick(testPlace);
          });
        },

        // fallback (성수역)
        () => {
          const fallback = new naver.maps.LatLng(37.5445, 127.0557);

          const map = new naver.maps.Map("map", {
            center: fallback,
            zoom: 14,
          });

          mapRef.current = map;
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    };

    document.head.appendChild(script);
  }, [onMarkerClick]);

  return <div id="map" className="w-full h-full" />;
}
