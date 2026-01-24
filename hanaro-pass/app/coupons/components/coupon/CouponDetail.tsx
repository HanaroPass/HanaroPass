'use client';

import Image from 'next/image';
import Link from 'next/link';
import Barcode from 'react-barcode';

interface CouponDetailProps {
  brandName?: string;
  brandPic?: string;
  tag?: string;
  couponNumber?: string;
}

export default function CouponDetail({
  brandPic = 'https://blog.kakaocdn.net/dna/lMgCJ/btqVvPDO1IB/AAAAAAAAAAAAAAAAAAAAAMppshZ7hQfAA8C0R-uK8w62V9O4BJYwNvifeBrHKjK8/img.jpg?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1769871599&allow_ip=&allow_referer=&signature=rXZhIFRLxIpT%2FxAqf7MMHNb%2Bdgc%3D',
  brandName = '스타벅스',
  tag = '#커피 전문점',
  couponNumber = 'HN-2025-001234',
}: CouponDetailProps) {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-10">
      <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border border-gray-100 shadow-sm">
        <Image
          src={brandPic}
          width={80}
          height={80}
          alt={`${brandName} 로고 이미지`}
          className="h-full w-full object-contain p-1"
        />
      </div>

      <h2 className="font-black text-3xl text-black-900">{brandName}</h2>
      <p className="mt-1 font-medium text-gray-500 text-sm">{tag}</p>

      <div className="my-10 aspect-square w-full max-w-70 overflow-hidden rounded-2xl bg-[#E0F2F1]/50">
        <div className="flex h-full items-center justify-center bg-linear-to-br from-[#E0F2F1] to-white p-6">
          <Image
            src="/images/benefits/character_star.svg"
            alt="쿠폰 캐릭터"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>
      </div>

      <p className="mb-6 text-gray-700 text-sm">
        매장에서 바코드를 제시해주세요
      </p>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center overflow-hidden py-2">
          <Barcode
            value={couponNumber}
            format="CODE128"
            displayValue={false}
            height={80}
            width={1.6}
            margin={0}
            background="transparent"
          />
        </div>
        <p className="font-medium text-gray-400 text-sm">
          쿠폰번호: <span className="uppercase">{couponNumber}</span>
        </p>
      </div>

      <div className="mt-6 w-full px-4 text-center text-gray-800 text-xs">
        <p className="mb-2">
          본 쿠폰은{' '}
          <span className="font-semibold text-gray-800">대표계좌</span>에서
          결제됩니다.
          <br />
          결제 계좌 변경은 이 화면에서 할 수 없어요.
        </p>

        <Link href="/" className="inline-block underline">
          메인으로 이동
        </Link>
      </div>
    </main>
  );
}
