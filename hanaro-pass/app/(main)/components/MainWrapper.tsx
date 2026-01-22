import { WalletMinimal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import RemittanceIcon from './icons/RemittanceIcon';
import ServiceIcon from './icons/ServiceIcon';
import TransferIcon from './icons/TransferIcon';

const TABS = [
  { key: 'pay', Icon: WalletMinimal },
  { key: 'remittance', Icon: RemittanceIcon },
  { key: 'transfer', Icon: TransferIcon },
  { key: 'service', Icon: ServiceIcon },
];

const INDICATOR_WIDTH = 52;
const TAB_WIDTH = 60;
const GAP = 22;

export default function MainWrapper({
  children,
  activeTab,
}: PropsWithChildren<{ activeTab: string }>) {
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

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
              <div
                className={cn(
                  'relative flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300',
                  activeTab === t.key ? 'bg-white-ez' : 'bg-[#65C7CA]',
                )}
              >
                <t.Icon
                  className={cn(
                    '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-1 h-10 w-10',
                    activeTab === t.key ? 'text-green-ez' : 'text-white',
                    'stroke-current',
                  )}
                />
                {activeTab !== t.key && (
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-0 h-13 w-13 rounded-full bg-green-ez" />
                )}
              </div>
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
