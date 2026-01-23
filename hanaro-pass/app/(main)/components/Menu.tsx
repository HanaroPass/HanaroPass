import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type MenuProps = {
  link?: string;
  label: string;
  icon: string;
};

function Menu({ link = '', label, icon }: MenuProps) {
  return (
    <Link
      href={link}
      className="flex h-18.75 w-full items-center justify-between rounded-2xl border border-gray-100 bg-[#F7FAFB] px-5 text-black-800"
    >
      <div className="flex items-center gap-3">
        <div className="flex w-9 items-center justify-center">
          <Image
            src={icon}
            alt={`${label} 아이콘`}
            width={36}
            height={0}
            sizes="36px"
            className="h-auto w-full object-contain"
          />
        </div>
        <span className="font-bold text-lg">{label}</span>
      </div>
      <ChevronRight size={24} />
    </Link>
  );
}

export default Menu;
