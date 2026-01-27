'use client';

import { useTransition } from 'react';
import { forceLoginAction, logoutAction } from '../actions/auth.action';

export function useAuth() {
  const [isPending, startTransition] = useTransition();

  const login = async (role: 'USER' | 'ADMIN') => {
    startTransition(async () => {
      try {
        const result = await forceLoginAction(role);
        if (result && !result.success) alert(`로그인 실패: ${result.message}`);
      } catch (error) {
        const isRedirect =
          error instanceof Error &&
          'digest' in error &&
          typeof error.digest === 'string' &&
          error.digest.startsWith('NEXT_REDIRECT');

        if (isRedirect) {
          throw error;
        }
        console.error('[Login Error]:', error);
        alert('로그인 처리 중 예상치 못한 오류가 발생했습니다.');
      }
    });
  };

  const logout = async () => {
    if (!confirm('[테스트] 정말 로그아웃 하시겠습니까?')) return;

    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) await reg.unregister();
    }

    startTransition(async () => {
      try {
        await logoutAction();
      } catch (error) {
        const isRedirect =
          error instanceof Error &&
          'digest' in error &&
          typeof error.digest === 'string' &&
          error.digest.startsWith('NEXT_REDIRECT');
        if (isRedirect) throw error;
        console.error('로그아웃 실패:', error);
      }
    });
  };

  return { login, logout, isPending };
}
