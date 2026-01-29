import Image from 'next/image';
import Link from 'next/link';

type CouponItemType = {
  id: string;
  brand: string;
  distanceLabel: string;
  tag: string;
  logo: string;
};

type CouponItemProps = {
  item: CouponItemType;
};

export default function CouponItem({ item }: CouponItemProps) {
  return (
    <Link
      href={`/coupons/${item.id}`}
      className="flex w-full flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-[#F7FAFB] px-1 py-3"
    >
      <div className="rounded-full bg-green-ez px-3 py-1 text-[10px] text-white">
        {item.distanceLabel}
      </div>

      <div className="flex h-8.75 w-8.75 items-center justify-center">
        <Image
          src={item.logo}
          alt={item.brand}
          width={35}
          height={0}
          sizes="100vw"
          className="h-auto w-8.75 object-contain"
          priority
        />
      </div>

      <span className="text-center font-bold text-[10px] text-black-800 leading-tight">
        {item.tag}
      </span>
    </Link>
  );
}
