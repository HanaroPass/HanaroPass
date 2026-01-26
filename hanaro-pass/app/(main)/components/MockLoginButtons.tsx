'use client';

import { forceLoginAction } from '../actions/auth.action';

export default function MockLoginButtons() {
  const handleLogin = async (role: 'USER' | 'ADMIN') => {
    const result = await forceLoginAction(role);

    if (result.success) {
      alert(`[${role}] ${result.data.nickname}님으로 로그인되었습니다. ✨`);
    } else {
      alert(`로그인 실패: ${result.message}`);
    }
  };

  return (
    <div className="fixed right-4 bottom-20 z-9999 flex flex-col gap-2 font-sans">
      <div className="mb-1 text-right font-bold text-[10px] text-black-400 uppercase tracking-tighter">
        Development Mode
      </div>

      <button
        onClick={() => handleLogin('USER')}
        className="flex h-10 items-center justify-center gap-2 bg-hana-green px-4 text-white-ez shadow-lg transition-transform active:scale-95"
        style={{
          borderRadius: 'var(--radius)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <span className="text-base">👤</span> USER
      </button>

      <button
        onClick={() => handleLogin('ADMIN')}
        className="flex h-10 items-center justify-center gap-2 bg-hana-red px-4 text-white-ez shadow-lg transition-transform active:scale-95"
        style={{
          borderRadius: 'var(--radius)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        <span className="text-base">👑</span> ADMIN
      </button>
    </div>
  );
}
