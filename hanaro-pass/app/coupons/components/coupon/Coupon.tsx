import { Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CouponProps = {
  id: number;
  brandPic: string;
  brandName: string;
  tag: string;
  category: string;
  discount: number;
  description: string;
};

function Coupon({
  id,
  brandPic,
  tag,
  discount,
  brandName,
  description,
}: CouponProps) {
  return (
    <div className="flex h-27.5 w-full items-center gap-4 overflow-hidden rounded-xl border border-gray-100 bg-white-ez px-4 shadow-sm">
      <div className="shrink-0">
        <Image
          src={brandPic}
          alt={`${brandName} logo`}
          width={64}
          height={64}
          className="aspect-auto h-16 w-16 rounded-md object-contain shadow-sm"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex content-center gap-2">
          <p className="font-semibold text-base text-black-800">{brandName}</p>
          <p className="text-gray-500 text-sm">{tag}</p>
        </div>
        <p className="font-bold text-green-ez text-xl">{discount}% 할인</p>
        <p className="text-black-800 text-sm">{description}</p>
      </div>
      <Link
        href={`/coupons/${id}`}
        aria-label={`${brandName} 쿠폰 받기`}
        className="flex h-12 w-12 shrink-0 items-center rounded-[14px] bg-green-ez"
      >
        <Ticket className="m-auto h-6 w-6 text-white-ez" />
      </Link>
    </div>
  );
}

export default Coupon;
