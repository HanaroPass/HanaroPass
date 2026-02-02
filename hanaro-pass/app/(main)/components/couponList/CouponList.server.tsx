import { getCouponNearbyCached } from '../../actions/getCouponNearby.action';
import CouponListClient from './CouponList.client';

export default async function CouponListServer({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const coupons = await getCouponNearbyCached({
    lat,
    lng,
    radiusKm: 2,
    limit: 4,
  });

  return <CouponListClient coupons={coupons} />;
}
