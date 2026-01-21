import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';

function layout({ children }: PropsWithChildren) {
  return (
    <div className="app-layout">
      <Header title="혜택" />
      <main className="app-main">{children}</main>
    </div>
  );
}

export default layout;
