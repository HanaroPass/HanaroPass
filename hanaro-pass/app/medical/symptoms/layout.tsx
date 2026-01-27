'use client';

import { useSearchParams } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import Header from '@/components/header/Header';

function SymptomsHeaderSection() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const title = mode === 'recommend' ? 'AI 병원 추천' : 'AI 번역';

  return <Header title={title} />;
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
