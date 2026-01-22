import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: 'K-map',
  description: '하나로패스의 K-map 서비스',
};

function layout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <Header title="K-map" />
      <main className="app-main">{children}</main>
    </div>
  );
}
export default layout;
