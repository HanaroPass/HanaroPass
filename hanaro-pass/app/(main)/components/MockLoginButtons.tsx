'use client';

type MockLoginButtonsProps = {
  loginAction: (role: 'USER' | 'ADMIN') => Promise<void>;
};

export default function MockLoginButtons({
  loginAction,
}: MockLoginButtonsProps) {
  return (
    <div className="fixed right-2 bottom-2 z-9999 flex flex-col gap-2 font-sans">
      <div className="mb-1 text-right font-bold text-[10px] text-black-400 uppercase tracking-tighter">
        Development Mode
      </div>
      <button
        type="button"
        onClick={() => loginAction('USER')}
        className="h-10 rounded-lg bg-hana-green px-4 text-white shadow-lg"
      >
        USER
      </button>
      <button
        type="button"
        onClick={() => loginAction('ADMIN')}
        className="h-10 rounded-lg bg-hana-red px-4 text-white shadow-lg"
      >
        ADMIN
      </button>
    </div>
  );
}
