import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/session';
import {
  type CouponDetailResponse,
  getCouponById,
} from '../../actions/getCoupon';
import CouponDetail from '../../components/coupon/CouponDetail';

export const revalidate = 3600;

export async function generateStaticParams() {
  const coupons = await prisma.coupon.findMany({
    take: 20,
    select: { id: true },
  });
  return coupons.map((coupon) => ({ id: coupon.id.toString() }));
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const userId = await getUserIdFromSession();
  if (!userId) notFound();

  const [coupon, defaultCard] = await Promise.all([
    getCouponById({ id }).catch(() => null),
    prisma.userCard.findFirst({
      where: { userId, isDefault: true },
      select: { id: true },
    }),
  ]);

  if (!coupon || !defaultCard) notFound();

  return (
    <CouponDetail
      brandPic={coupon.brandPic}
      brandName={coupon.brandName}
      tag={coupon.tag ?? ''}
      couponNumber={coupon.couponCode}
      id={coupon.id}
      defaultCardId={defaultCard.id}
    />
  );
}
