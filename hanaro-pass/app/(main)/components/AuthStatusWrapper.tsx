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

  // 작성하신 useAuth 훅에서 필요한 기능을 가져옵니다.
  const { login, logout, isPending } = useAuth();

  useEffect(() => {
    if (!isPending) {
      const hasSession = document.cookie.includes('user_secure_session');
      setIsLoggedIn(hasSession);
      setIsLoading(false);
    }
  }, [isPending]); // 로그인/로그아웃 상태 변화(isPending)가 끝날 때마다 재확인

  if (isLoading) return null; // 초기 로딩 시 깜빡임 방지

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
