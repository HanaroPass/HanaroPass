import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import BottomMapButton from '../../components/symptom/BottomMapButton';

export default function recommendLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex-1 overflow-y-auto py-6">{children}</div>

      <div className="sticky bottom-0 z-50 bg-white px-5 py-7">
        <Link href="/map">
          <BottomMapButton />
        </Link>
      </div>
    </div>
  );
}
