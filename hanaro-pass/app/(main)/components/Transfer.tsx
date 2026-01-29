'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AccountSummary from './AccountSummary';
import { MenuList } from './MenuList';

const BANNERS = [
  {
    id: 1,
    src: '/images/main/ad-savings.png',
    alt: '하나 EZ 적금',
    href: 'https://www.kebhana.com/cont/mall/mall08/mall0801/mall080102/1508308_115157.jsp',
    isExternal: true,
  },
  {
    id: 2,
    src: '/images/main/lucky-pouch-banner.png',
    alt: '복주머니 보내기',
    href: '/pouch',
    isExternal: false,
  },
];

function Transfer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const currentBanner = BANNERS[currentIndex];

  return (
    <div className="flex flex-col gap-5">
      <AccountSummary />
      <button
        type="button"
        className="flex h-13.25 items-center justify-center gap-1 rounded-xl border-2 border-black-200 font-semibold text-base text-black-800"
      >
        <Image
          src="/images/main/accounts.svg"
          width={25}
          height={18}
          alt="보유계좌조회"
        />
        보유계좌조회
      </button>
      <MenuList type="transfer" />
      <div className="relative w-full overflow-hidden rounded-xl">
        <Link
          href={currentBanner.href}
          target={currentBanner.isExternal ? '_blank' : undefined}
          rel={currentBanner.isExternal ? 'noopener noreferrer' : undefined}
          className="block w-full"
        >
          <div className="relative aspect-340/139 w-full">
            <Image
              src={currentBanner.src}
              alt={currentBanner.alt}
              fill
              className="object-fill"
              priority
            />
          </div>
        </Link>

        <div className="-translate-x-1/2 absolute bottom-3 left-1/2 flex gap-1.5">
          {BANNERS.map((_, index) => (
            <div
              key={_.id}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-(--color-green-dark)'
                  : 'bg-black-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transfer;
