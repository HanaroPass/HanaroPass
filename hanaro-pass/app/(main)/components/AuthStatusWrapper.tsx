// hanaro-pass/app/(main)/components/AuthStatusWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // 작성하신 훅을 사용합니다.
import MockLoginButtons from './MockLoginButtons';
import MockLogoutButton from './MockLogoutButton';
import PushNotificationManager from './PushNotificationManager';

export default function AuthStatusWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { login, logout, isPending } = useAuth();

  useEffect(() => {
    if (!isPending) {
      const hasSession = document.cookie.includes('user_secure_session');
      setIsLoggedIn(hasSession);
      setIsLoading(false);
    }
  }, [isPending]);

  if (isLoading) return null;

  return (
    <>
      <PushNotificationManager isLoggedIn={isLoggedIn} />
      {process.env.NODE_ENV === 'development' &&
        (isLoggedIn ? (
          <MockLogoutButton logoutAction={logout} isPending={isPending} />
        ) : (
          <MockLoginButtons loginAction={login} />
        ))}
    </>
  );
}
