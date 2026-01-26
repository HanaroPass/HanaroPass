'use client';

import { Loader2, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function MockLogoutButton() {
  const { logout, isPending } = useAuth();

  return (
    <button
      onClick={logout}
      className="fixed right-6 bottom-20 z-9999 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-xl"
    >
      {isPending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <LogOut size={20} />
      )}
    </button>
  );
}
