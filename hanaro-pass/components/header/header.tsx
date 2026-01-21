'use client';

import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface HeaderProps {
  title?: string;
  leftType?: 'back' | 'none';
  onLeftClick?: () => void;
  rightElement?: ReactNode;
  className?: string;
}

export default function Header({
  title = '',
  leftType = 'back',
  onLeftClick,
  rightElement,
  className = '',
}: HeaderProps) {
  const router = useRouter();

  const handleLeftClick = () => {
    if (onLeftClick) {
      onLeftClick();
      return;
    }
    router.back();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-gray-100 border-b bg-white-ez ${className}`}
    >
      <div className="h-[env(safe-area-inset-top)]" />
      <div className="relative flex h-14 items-center justify-between px-4">
        <div className="flex justify-start">
          {leftType !== 'none' && (
            <button
              onClick={handleLeftClick}
              className="-ml-2 p-2 transition-opacity active:opacity-50"
              aria-label={leftType === 'back' ? '뒤로가기' : '닫기'}
            >
              <ChevronLeft size={24} className="text-black-900" />
            </button>
          )}
        </div>

        <div className="-translate-x-1/2 absolute left-1/2 max-w-[60%]">
          <h1 className="truncate font-semibold text-base text-black-900 tracking-tight">
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
