import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';

export default function symptomsLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <Header title="AI 병원 추천" />
      <div className="app-main no-scrollbar">{children}</div>
    </div>
  );
}
