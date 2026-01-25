import { getCouponById } from '../../actions/getCoupon';
import CouponDetail from '../../components/coupon/CouponDetail';

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
