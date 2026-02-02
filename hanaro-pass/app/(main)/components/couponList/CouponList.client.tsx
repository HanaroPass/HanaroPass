'use client';

import type { CouponNearbyItem } from '../../actions/getCouponNearby.schema';
import CouponItem from '../CouponItem';

export default function CouponListClient({
  coupons,
}: {
  coupons: CouponNearbyItem[];
}) {
  return (
    <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto">
      {coupons.map((item) => (
        <CouponItem
          key={item.id}
          item={{
            id: String(item.id),
            brand: item.brandName,
            distanceLabel: item.distanceLabel,
            tag: item.tag ?? '',
            logo: item.brandPic,
          }}
        />
      ))}
    </div>
  );
}
