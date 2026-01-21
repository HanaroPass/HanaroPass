import { Search } from 'lucide-react';
import {
  TabsLine,
  TabsLineList,
  TabsLineTrigger,
} from '@/components/tabsLine/TabsLine';
import { Input } from '@/components/ui/input';
import { BENEFIT_BANNER_VARIANTS } from '@/constants/benefitBanner';
import { COUPON_CATEGORY_TABS } from '@/constants/couponCategory';
import BenefitBanner from './components/benefitBanner/BenefitBanner';
import Coupon from './components/coupon/Coupon';
import { mockCoupons } from './mock/mockCoupon';

function page() {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col">
      <div className="px-4 pt-2">
        <div className="flex items-center gap-1 bg-gray-100 px-3">
          <Search />
          <Input placeholder="쿠폰 검색" className="border-none outline-none" />
        </div>
        <TabsLine
          defaultValue="all"
          className="no-scrollbar mb-4 w-full overflow-auto overflow-y-hidden"
        >
          <TabsLineList>
            {COUPON_CATEGORY_TABS.map(({ value, label }) => (
              <TabsLineTrigger key={value} value={value}>
                {label}
              </TabsLineTrigger>
            ))}
          </TabsLineList>
        </TabsLine>
        <div className="flex flex-col gap-3">
          {mockCoupons.map((coupon) => (
            <Coupon
              key={coupon.couponId}
              brandName={coupon.brandName}
              tag={coupon.tag}
              category={coupon.category}
              discount={coupon.discount}
              description={coupon.description}
              brandPic={coupon.brandPic}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto pt-6">
        <BenefitBanner
          variant={BENEFIT_BANNER_VARIANTS.SKI}
          countryCode="HK"
          name="Chan"
        />
      </div>
    </div>
  );
}

export default page;
