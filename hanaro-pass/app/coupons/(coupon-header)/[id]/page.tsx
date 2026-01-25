import { prisma } from '@/lib/prisma';
import { getCouponById } from '../../actions/getCoupon';
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

  const coupon = await getCouponById({ id });

  return (
    <CouponDetail
      brandPic={coupon.brandPic}
      brandName={coupon.brandName}
      tag={coupon.tag ?? ''}
      couponNumber={coupon.couponCode}
    />
  );
}
