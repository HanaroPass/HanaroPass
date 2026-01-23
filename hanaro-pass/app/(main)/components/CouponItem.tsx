import Image from 'next/image';
import type { CouponItemType } from './CouponList';

type Props = {
  item: CouponItemType;
};

export default function CouponItem({ item }: Props) {
  return (
    <div className="flex min-h-19.25 w-17.5 shrink-0 flex-col items-center rounded-2xl border border-gray-100 bg-[#F7FAFB] p-3">
      <div className="rounded-full bg-green-ez px-3 py-1 text-[10px] text-white">
        {item.distanceLabel}
      </div>

      <div className="flex h-8.75 items-center justify-center">
        <Image
          src={item.logo}
          alt={item.brand}
          height={35}
          width={0}
          sizes="100vw"
          className="h-8.75 w-auto object-contain"
          priority
        />
      </div>

      <span className="text-center font-bold text-[10px] text-black-800 leading-tight">
        {item.tag}
      </span>
    </div>
  );
}
