import { Suspense } from 'react';
import { getCouponNearbyCached } from '../actions/getCouponNearby.action';
import CouponListClient from './CouponList.client';

export default function CouponListServer({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const couponsPromise = getCouponNearbyCached({
    lat,
    lng,
    radiusKm: 2,
    limit: 10,
  });

  return (
    <Suspense fallback={<div className="h-20" />}>
      <CouponListClient couponsPromise={couponsPromise} />
    </Suspense>
  );
}
