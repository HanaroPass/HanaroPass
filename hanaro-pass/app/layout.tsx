import type { Metadata } from 'next';
import { Suspense } from 'react';
import AuthStatusWrapper from './(main)/components/AuthStatusWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hanaro Pass',
  description:
    '한국 생활, 하나로 끝! 모든 방한 외국인을 위한 한국 여정 금융 동반 서비스, 하나로패스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <Suspense fallback={null}>
          <div className="app-shell">{children}</div>
        </Suspense>

        <Suspense fallback={null}>
          <AuthStatusWrapper />
        </Suspense>
      </body>
    </html>
  );
}
