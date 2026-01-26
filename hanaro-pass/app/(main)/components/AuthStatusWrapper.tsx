// hanaro-pass/app/(main)/components/AuthStatusWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { checkAuthStatusAction } from '../actions/auth.action';
import { useAuth } from '../hooks/useAuth'; // 작성하신 훅을 사용합니다.
import MockLoginButtons from './MockLoginButtons';
import MockLogoutButton from './MockLogoutButton';
import PushNotificationManager from './PushNotificationManager';

export default function AuthStatusWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { login, logout, isPending } = useAuth();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await checkAuthStatusAction();
        setIsLoggedIn(result.success);
      } catch (error) {
        console.error('인증 상태 확인 중 오류 발생:', error);
        alert('인증 상태 확인 중 오류가 발생했습니다.');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isPending) {
      fetchStatus();
    }
  }, [isPending]);

  if (isLoading) return null;

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      {isLoggedIn && <PushNotificationManager isLoggedIn={isLoggedIn} />}

      {isDev && (
        <div className="fixed right-4 bottom-20 z-9999">
          {isLoggedIn ? (
            <MockLogoutButton logoutAction={logout} isPending={isPending} />
          ) : (
            <MockLoginButtons loginAction={login} />
          )}
        </div>
      )}
    </>
  );
}
