import type { Metadata } from 'next';
import { getSession } from '@/lib/session';
import MockLoginButtons from './(main)/components/MockLoginButtons';
import MockLogoutButton from './(main)/components/MockLogoutButton';
import PushNotificationManager from './(main)/components/PushNotificationManager';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hanaro Pass',
  description:
    '한국 생활, 하나로 끝! 모든 방한 외국인을 위한 한국 여정 금융 동반 서비스, 하나로패스',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isLoggedIn = !!session.userId;

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <div className="app-shell">{children}</div>

        <PushNotificationManager isLoggedIn={isLoggedIn} />
        {process.env.NODE_ENV === 'development' && (
          <>
            {!isLoggedIn && <MockLoginButtons />}
            {isLoggedIn && <MockLogoutButton />}
          </>
        )}
      </body>
    </html>
  );
}
