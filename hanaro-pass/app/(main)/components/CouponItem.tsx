import Image from 'next/image';

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
    <div className="flex w-full flex-col items-center rounded-2xl border border-gray-100 bg-[#F7FAFB] py-3">
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
