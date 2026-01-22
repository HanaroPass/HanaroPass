import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type MenuProps = {
  link?: string;
  label: string;
  icon: string;
};

export function Menu({ link = '', label, icon }: MenuProps) {
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

type PrimaryMenuCardProps = {
  title: string;
  description?: string;
  icon: string;
  link: string;
};

export function PrimaryMenuCard({
  title,
  description,
  icon,
  link,
}: PrimaryMenuCardProps) {
  return (
    <Link
      href={link}
      className="flex h-50 flex-col justify-between rounded-3xl border border-gray-100 bg-gray-50 p-5"
    >
      <div>
        <h3 className="font-bold text-base text-black-800">{title}</h3>
        {description && (
          <p className="mt-1 whitespace-pre-line text-[10px] text-black-600">
            {description}
          </p>
        )}

        <div className="mt-3 inline-flex items-center gap-1 text-green-ez">
          <span className="font-semibold text-sm">바로가기</span>
          <ChevronRight size={16} />
        </div>
      </div>

      <div className="mt-4 flex items-end">
        <Image
          src={icon}
          alt={title}
          width={90}
          height={80}
          className="object-contain"
        />
      </div>
    </Link>
  );
}
