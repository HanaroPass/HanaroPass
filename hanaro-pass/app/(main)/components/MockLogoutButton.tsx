'use client';

import { LogOut } from 'lucide-react';
import { logoutAction } from '../actions/auth.action';

export default function MockLogoutButton() {
  const handleLogout = async () => {
    // 1. 확인창
    if (!confirm('[테스트] 정말 로그아웃 하시겠습니까?')) return;

    try {
      console.log('로그아웃 프로세스 시작...');

      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log('서비스 워커 해제 완료');
        }
      }

      await logoutAction();

      console.log('로그아웃 완료 및 페이지 이동');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed right-6 bottom-20 z-9999 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-xl transition-transform active:scale-95"
      title="테스트 로그아웃"
    >
      <LogOut size={20} />
    </button>
  );
}
