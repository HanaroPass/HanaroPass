import { ArrowRight, ChevronDown, WalletMinimal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import Footer from './Footer';
import RemittanceIcon from './icons/RemittanceIcon';
import ServiceIcon from './icons/ServiceIcon';
import TransferIcon from './icons/TransferIcon';
import NotificationBell from './NotificationBell';

const TABS = [
  { key: 'pay', Icon: WalletMinimal },
  { key: 'remittance', Icon: RemittanceIcon },
  { key: 'transfer', Icon: TransferIcon },
  { key: 'service', Icon: ServiceIcon },
];
const INDICATOR_WIDTH = 50;
const TAB_WIDTH = 64;
const GAP = 22;

export default function MainWrapper({
  children,
  activeTab,
  isRegistered = true,
}: PropsWithChildren<{ activeTab: string; isRegistered?: boolean }>) {
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

  const totalWidth = TABS.length * TAB_WIDTH + (TABS.length - 1) * GAP;
  const translateX =
    safeIndex * (TAB_WIDTH + GAP) + (TAB_WIDTH - INDICATOR_WIDTH) / 2;

  return (
    <div className="bg-green-ez">
      <header className="sticky top-0 z-50 flex h-16.25 w-full items-center justify-between bg-green-ez px-4.5 py-3.5">
        <p className="font-hana text-sm text-white">Hana Ro Pass</p>
        <div className="flex gap-4">
          <button type="button" className="flex items-center gap-2">
            <Image
              width={28}
              height={19}
              src="/images/main/korea.png"
              alt="언어 설정 국가"
            />
            <ChevronDown size={20} stroke="white" />
          </button>
          <NotificationBell />
          <Image
            width={20}
            height={20}
            src="/images/main/profile.svg"
            alt="프로필"
          />
        </div>
      </header>

      <main className="pt-2">
        {isRegistered ? (
          <>
            <section className="mb-3 flex justify-center gap-5.5">
              {TABS.map((t) => (
                <Link
                  key={t.key}
                  href={{ pathname: '/', query: { tab: t.key } }}
                >
                  <div
                    className={cn(
                      'relative flex h-16 w-16 items-center justify-center rounded-full shadow-sm',
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
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-0 h-13 w-13 rounded-full bg-green-ez shadow-sm" />
                    )}
                  </div>
                </Link>
              ))}
            </section>

            <div
              className="relative mx-auto h-2.5"
              style={{ width: totalWidth }}
            >
              <Image
                src="/images/main/indicator.svg"
                width={INDICATOR_WIDTH}
                height={10}
                alt="Indicator"
                className="-bottom-px absolute left-0 transition-transform duration-300 ease-out"
                style={{ transform: `translateX(${translateX}px)` }}
              />
            </div>
          </>
        ) : (
          <section className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="whitespace-pre-line font-bold text-2xl text-white leading-tight">
                {'모바일 신분증을\n'}
                <span className="underline underline-offset-4">등록</span>
                해주세요.
              </h2>

              <Link
                href="/user/identity"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white"
                aria-label="모바일 신분증 등록하기"
              >
                <ArrowRight size={35} className="text-green-ez" />
              </Link>
            </div>
          </section>
        )}
        <section className="rounded-t-4xl bg-white px-4 pt-5 pb-7">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Title({ children }: PropsWithChildren) {
  return (
    <div className="mb-4">
      <h1 className="font-bold text-xl">{children}</h1>
    </div>
  );
}

MainWrapper.Title = Title;
