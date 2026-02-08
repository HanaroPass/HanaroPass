'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type Coords = { lat: number; lng: number };
const DEFAULT: Coords = { lat: 37.5446, lng: 127.0559 };

function getCurrentCoords(): Promise<Coords> {
  if (!navigator.geolocation) return Promise.resolve(DEFAULT);

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => resolve(DEFAULT),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60_000 },
    );
  });
}

export default function GeoBoot() {
  const router = useRouter();
  const sp = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 'searchParams는 URL 변경 시마다 새 객체가 생성되므로 최초 1회만 좌표 주입'
  useEffect(() => {
    if (sp.get('lat') && sp.get('lng')) return;

    (async () => {
      const { lat, lng } = await getCurrentCoords();
      const next = new URLSearchParams(sp.toString());
      next.set('lat', String(lat));
      next.set('lng', String(lng));
      router.replace(`/?${next.toString()}`);
    })();
  }, []);

  return null;
}
