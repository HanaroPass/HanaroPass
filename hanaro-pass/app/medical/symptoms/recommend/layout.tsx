'use client';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import ActionButton from '@/components/ui/ActionButton';

export default function recommendLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}

      <div className="-translate-x-1/2 fixed bottom-0 left-1/2 w-full bg-white px-5 py-5">
        <Link href="/">
          <ActionButton
            className="w-full"
            text="홈으로 돌아가기"
            onClick={() => {}}
          />
        </Link>
      </div>
    </>
  );
}
