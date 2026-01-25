import CouponItem from './CouponItem';

export type CouponItemType = {
  id: string;
  brand: string;
  distanceLabel: string;
  tag: string;
  logo: string;
};

// TODO: 실제 데이터로 변경
export const COUPON_MOCKS: CouponItemType[] = [
  {
    id: 'gs25-1',
    brand: 'GS25',
    distanceLabel: '0.12km',
    tag: '#편의점',
    logo: 'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
  },
  {
    id: 'oliveyoung',
    brand: 'OLIVE YOUNG',
    distanceLabel: '25m',
    tag: '#뷰티샵',
    logo: 'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
  },
  {
    id: 'musinsa',
    brand: 'MUSINSA',
    distanceLabel: '20m',
    tag: '#편집숍',
    logo: 'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
  },
  {
    id: 'gs25-2',
    brand: 'GS25',
    distanceLabel: '12m',
    tag: '#편의점',
    logo: 'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
  },
];

function CouponList() {
  return (
    <div className="no-scrollbar flex w-full justify-center gap-1 overflow-x-auto">
      {COUPON_MOCKS.map((item) => (
        <CouponItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CouponList;
