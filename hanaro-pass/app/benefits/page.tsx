import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Coupon from './components/coupon/Coupon';
import { mockCoupons } from './mock/mockCoupon';

function page() {
  return (
    <div className="px-4 pt-2">
      <div className="flex items-center gap-1 bg-gray-100 px-3">
        <Search />
        <Input placeholder="쿠폰 검색" className="border-none outline-none" />
      </div>
      <div className="flex flex-col gap-3">
        {mockCoupons.map((coupon) => (
          <Coupon
            key={coupon.id}
            brandName={coupon.brandName}
            tag={coupon.tag}
            category={coupon.category}
            discount={coupon.discount}
            description={coupon.description}
            brandPic={coupon.brandPic}
          />
        ))}
      </div>{' '}
    </div>
  );
}

export default page;
