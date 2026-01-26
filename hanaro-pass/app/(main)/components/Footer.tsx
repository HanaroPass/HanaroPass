'use client';

import { DollarSign, Home, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import WonIcon from './icons/WonIcon';

type FooterTabKey = 'home' | 'search' | 'transfer' | 'remittance' | 'menu';

const FOOTER_TABS: {
  key: FooterTabKey;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { key: 'home', label: '홈', Icon: Home },
  { key: 'search', label: '조회', Icon: Search },
  { key: 'transfer', label: '이체', Icon: WonIcon },
  { key: 'remittance', label: '송금', Icon: DollarSign },
  { key: 'menu', label: '메뉴', Icon: Menu },
];

export default function Footer({
  activeTab = 'home',
}: {
  activeTab?: FooterTabKey;
}) {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastYRef.current;

        const THRESHOLD = 8;

        if (y < 20) {
          setVisible(true);
        } else if (diff > THRESHOLD) {
          setVisible(false);
        } else if (diff < -THRESHOLD) {
          setVisible(true);
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed bottom-0 z-50 border-t bg-white',
        'transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full',
        '-translate-x-1/2 left-1/2 w-full',
        'md:w-93.75',
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {FOOTER_TABS.map(({ key, label, Icon }) => {
          const isActive = activeTab === key;

          return (
            <li key={key}>
              <Link
                href={{ pathname: '/', query: { footer: key } }}
                className="flex flex-col items-center gap-1 px-2 py-1"
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={cn(
                    'h-6 w-6',
                    isActive ? 'text-green-ez' : 'text-black-800',
                  )}
                />
                <span
                  className={cn(
                    'text-xs',
                    isActive ? 'text text-green-ez' : 'text-black-800',
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
