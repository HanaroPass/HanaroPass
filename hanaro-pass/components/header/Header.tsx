'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type HeaderProps = {
  title?: string;
  leftType?: 'back' | 'none';
  leftHref?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  className?: string;
};

export default function Header({
  title = '',
  leftType = 'back',
  leftHref,
  leftElement,
  rightElement,
  className = '',
}: HeaderProps) {
  const router = useRouter();

  const handleLeftClick = () => {
    if (leftHref) {
      router.push(leftHref);
      return;
    }
    router.back();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-gray-100 border-b bg-white ${className}`}
    >
      <div className="h-[env(safe-area-inset-top)]" />
      <div className="relative flex h-14 items-center justify-between px-4">
        <div className="flex justify-start">
          {leftElement
            ? leftElement
            : leftType !== 'none' && (
                <button
                  onClick={handleLeftClick}
                  className="-ml-2 p-2 text-black-900 transition-opacity active:opacity-50"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
        </div>

        <div className="-translate-x-1/2 absolute left-1/2 max-w-[60%]">
          <h1 className="truncate font-semibold text-base text-black-900">
            {title}
          </h1>
        </div>

        <div className="flex justify-end">
          {rightElement || <div className="w-6" />}
        </div>
      </div>
    </header>
  );
}
