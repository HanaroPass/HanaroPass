'use client';

import { useAuth } from '../hooks/useAuth';

export default function MockLoginButtons() {
  const { login } = useAuth();

  return (
    <div className="fixed right-4 bottom-20 z-9999 flex flex-col gap-2 font-sans">
      <div className="mb-1 text-right font-bold text-[10px] text-black-400 uppercase tracking-tighter">
        Development
      </div>
      <button
        onClick={() => login('USER')}
        className="h-10 rounded-lg bg-hana-green px-4 text-white shadow-lg"
      >
        👤 USER
      </button>
      <button
        onClick={() => login('ADMIN')}
        className="h-10 rounded-lg bg-hana-red px-4 text-white shadow-lg"
      >
        👑 ADMIN
      </button>
    </div>
  );
}
