'use client';

import { Loader2, LogOut } from 'lucide-react';

type MockLogoutButtonProps = {
  logoutAction: () => Promise<void>;
  isPending: boolean;
};

export default function MockLogoutButton({
  logoutAction,
  isPending,
}: MockLogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={logoutAction}
      disabled={isPending}
      className="fixed right-6 bottom-20 z-9999 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-xl"
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
