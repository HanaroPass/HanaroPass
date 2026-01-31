import Link from 'next/link';
import { Suspense } from 'react';
import { BENEFIT_BANNER_VARIANTS } from '@/constants/benefitBanner';
import { getCouponsCached } from '../actions/getCouponList';
import { CouponSearchSchema } from '../actions/getCouponList.schema';
import BenefitBanner from '../components/benefitBanner/BenefitBanner';
import CouponListClient from '../components/coupon/CouponList';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col">
      <div className="px-4 pt-2">
        <Suspense fallback={<CouponListSkeleton />}>
          <CouponListContainer searchParams={searchParams} />
        </Suspense>
      </div>

      <Link href="/coupons/benefit/1" className="mt-auto pt-6">
        <BenefitBanner
          variant={BENEFIT_BANNER_VARIANTS.SKI}
          countryCode="MNG"
          name="Batsukh"
        />
      </Link>
    </div>
  );
}

async function CouponListContainer({
  searchParams,
}: {
  searchParams: PageProps['searchParams'];
}) {
  const params = await searchParams;
  const validated = CouponSearchSchema.parse(params);

  const coupons = await getCouponsCached({
    category: validated.category === 'ALL' ? undefined : validated.category,
    q: validated.q || undefined,
  });

  return (
    <CouponListClient
      coupons={coupons}
      initialCategory={validated.category}
      initialQuery={validated.q ?? ''}
    />
  );
}

function CouponListSkeleton() {
  return (
    <div className="animate-pulse py-10 text-center text-gray-400">
      불러오는 중...
    </div>
  );
}
