'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import SearchInput from '@/components/SearchInput/SearchInput';
import {
  TabsLine,
  TabsLineList,
  TabsLineTrigger,
} from '@/components/tabsLine/TabsLine';
import { COUPON_CATEGORY_TABS } from '@/constants/couponCategory';
import type {
  CouponListResponse,
  CouponTabValue,
} from '../../actions/getCouponList.schema';
import Coupon from './Coupon';

type Props = {
  coupons: CouponListResponse[];
  initialCategory: CouponTabValue;
  initialQuery: string;
};

export default function CouponListClient({
  coupons,
  initialCategory,
  initialQuery,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [draftQuery, setDraftQuery] = useState(initialQuery);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === 'ALL') {
          sp.delete(key);
        } else {
          sp.set(key, value.trim());
        }
      });

      startTransition(() => {
        router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  return (
    <>
      <SearchInput
        id="coupon-search"
        placeholder="쿠폰을 검색해주세요"
        value={draftQuery}
        onChange={(e) => setDraftQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && updateParams({ q: draftQuery })}
        disabled={isPending}
      />

      <TabsLine
        value={initialCategory}
        onValueChange={(v) => updateParams({ category: v as string })}
        className="no-scrollbar mb-4 w-full overflow-auto"
      >
        <TabsLineList>
          {COUPON_CATEGORY_TABS.map(({ value, label }) => (
            <TabsLineTrigger key={value} value={value} disabled={isPending}>
              {label}
            </TabsLineTrigger>
          ))}
        </TabsLineList>
      </TabsLine>

      <div
        className={`flex flex-col gap-3 transition-opacity duration-200 ${
          isPending ? 'pointer-events-none opacity-50' : 'opacity-100'
        }`}
      >
        {coupons.length > 0 ? (
          coupons.map((coupon) => <Coupon key={coupon.id} {...coupon} />)
        ) : (
          <div className="py-20 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
