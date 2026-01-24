'use client';

import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import Header from '@/components/header/Header';

function SymptomsHeaderSection() {
  const pathname = usePathname();
  const title= pathname.startsWith('/medical/symptoms/recommend')? 'AI 병원 추천' : 'AI 번역';

  return <Header title={title} />
  
}

export default function SymptomsLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <Suspense fallback={null}>
        <SymptomsHeaderSection />
      </Suspense>
      <div className="app-main no-scrollbar">{children}</div>
    </div>
  );
}
