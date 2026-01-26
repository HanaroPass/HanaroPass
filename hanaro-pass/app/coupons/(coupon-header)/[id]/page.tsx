import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  type CouponDetailResponse,
  getCouponById,
} from '../../actions/getCoupon';
import CouponDetail from '../../components/coupon/CouponDetail';

export const revalidate = 3600;

export async function generateStaticParams() {
  const coupons = await prisma.coupon.findMany({ select: { id: true } });
  return coupons.map((coupon) => ({ id: coupon.id.toString() }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  let coupon: CouponDetailResponse;
  try {
    coupon = await getCouponById({ id });
  } catch {
    notFound();
  }

  return (
    <CouponDetail
      brandPic={coupon.brandPic}
      brandName={coupon.brandName}
      tag={coupon.tag ?? ''}
      couponNumber={coupon.couponCode}
    />
  );
}
