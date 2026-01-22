import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

const TABS = [
  { key: 'pay', label: '페이' },
  { key: 'transfer', label: '조회/이체' },
  { key: 'remittance', label: '송금' },
  { key: 'service', label: '서비스' },
];

export default function MainWrapper({
  children,
  activeTab,
}: PropsWithChildren<{ activeTab: string }>) {
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

  const INDICATOR_WIDTH = 50;
  const TAB_WIDTH = 60;
  const GAP = 22;

  const translateX = safeIndex * (TAB_WIDTH + GAP);

  return (
    <div className="bg-green-ez">
      <header className="flex h-16.25 w-full items-center justify-between bg-transparent px-4.5 py-3.5">
        <p className="font-hana text-sm text-white">Hana Ro Pass</p>
        <div className="flex gap-4">
          <button>언어 선택</button>
          <button>알림</button>
          <button>프로필</button>
        </div>
      </header>

      <main className="pt-2">
        <section className="mb-3 flex justify-center gap-5.5">
          {TABS.map((t) => (
            <Link key={t.key} href={{ pathname: '/', query: { tab: t.key } }}>
              {t.label}
            </Link>
          ))}
        </section>

        <div className="relative mx-auto h-2.5 w-70">
          <Image
            src="/images/main/indicator.svg"
            width={INDICATOR_WIDTH}
            height={10}
            alt="Indicator"
            className="-bottom-px absolute left-0 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${translateX}px)` }}
          />
        </div>

        <section className="rounded-t-4xl bg-white px-4 pt-5 pb-7">
          {children}
        </section>
      </main>
    </div>
  );
}
