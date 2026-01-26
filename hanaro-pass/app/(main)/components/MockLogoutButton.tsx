'use client';

import { Loader2, LogOut } from 'lucide-react';
import { useTransition } from 'react';
import { logoutAction } from '../actions/auth.action';

export default function MockLogoutButton() {
  const [isPending, startTransition] = useTransition();
  const handleLogout = async () => {
    if (!confirm('[테스트] 정말 로그아웃 하시겠습니까?')) return;
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('서비스 워커 해제 완료');
      }
    }
    startTransition(async () => {
      try {
        await logoutAction();
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed right-6 bottom-20 z-9999 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-xl transition-transform active:scale-95"
      title="테스트 로그아웃"
    >
      {isPending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <LogOut size={20} />
      )}
    </button>
  );
}
