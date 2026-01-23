import CouponDetail from '../../components/coupon/CouponDetail';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const data = {
    brandPic:
      'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
    brandName: '스타벅스',
    tag: '#커피 전문점',
    couponNumber: `HN-${id}-001234`,
  };

  return (
    <CouponDetail
      brandPic={data.brandPic}
      brandName={data.brandName}
      tag={data.tag}
      couponNumber={data.couponNumber}
    />
  );
}
