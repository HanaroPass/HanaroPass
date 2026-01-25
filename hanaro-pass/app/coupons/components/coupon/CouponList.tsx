'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
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

  const currentQuery = searchParams.get('q') ?? initialQuery;
  const [draftQuery, setDraftQuery] = useState(currentQuery);

  useEffect(() => {
    setDraftQuery(currentQuery);
  }, [currentQuery]);

  const updateParams = useCallback(
    (
      updates: Record<string, string | undefined>,
      mode: 'push' | 'replace' = 'push',
    ) => {
      const sp = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        const trimmed = value?.trim();
        if (!trimmed || trimmed === 'ALL') sp.delete(key);
        else sp.set(key, trimmed);
      });

      const url = `${pathname}?${sp.toString()}`;

      startTransition(() => {
        if (mode === 'push') router.push(url, { scroll: false });
        else router.replace(url, { scroll: false });
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') updateParams({ q: draftQuery }, 'push');
        }}
        onClear={() => {
          setDraftQuery('');
          updateParams({ q: undefined }, 'push');
        }}
        onChange={(e) => {
          const next = e.target.value;
          setDraftQuery(next);
          if (next.trim() === '') updateParams({ q: undefined }, 'replace');
        }}
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
