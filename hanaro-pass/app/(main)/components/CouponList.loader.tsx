'use client';

import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCouponNearbyCached } from '../actions/getCouponNearby.action';
import type { CouponNearbyItem } from '../actions/getCouponNearby.schema';
import CouponListClient from './CouponList.client';

type Coords = { lat: number; lng: number };
const DEFAULT_COORDS: Coords = { lat: 37.5446, lng: 127.0559 };

function getCurrentCoords(): Promise<Coords> {
  if (!navigator.geolocation) return Promise.resolve(DEFAULT_COORDS);

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => resolve(DEFAULT_COORDS),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60_000 },
    );
  });
}

export default function CouponListLoader() {
  const [coupons, setCoupons] = useState<CouponNearbyItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { lat, lng } = await getCurrentCoords();
      const data = await getCouponNearbyCached({
        lat,
        lng,
        radiusKm: 2,
        limit: 4,
      });

      if (!cancelled) setCoupons(data);
    })().catch(() => {
      if (!cancelled) setCoupons([]);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!coupons)
    return <Loader className="mx-auto h-8 w-8 animate-spin text-green-ez" />;
  return <CouponListClient coupons={coupons} />;
}
