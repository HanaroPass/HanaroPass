import type { ReactNode } from 'react';
import BackButton from './BackButton';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightElement?: ReactNode;
  className?: string;
}

export default function Header({
  title = 'Hanaro Pass',
  showBack = true,
  rightElement,
  className = '',
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 w-full border-gray-50 border-b bg-white ${className}`}
    >
      <div className="h-[env(safe-area-inset-top)]" />

      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex justify-start">{showBack && <BackButton />}</div>

        <div className="flex flex-1 justify-center overflow-hidden">
          <h1 className="truncate font-bold text-gray-900 text-lg tracking-tight">
            {title}
          </h1>
        </div>

        <div className="flex items-center justify-end">
          {rightElement || <div className="w-6" />}
        </div>
      </div>
    </header>
  );
}
