'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

type Phase = 'splash-in' | 'splash-out' | 'done';

export default function LoadingGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>('splash-in');

  useEffect(() => {
    const key = 'hanaez_splash_seen';
    const seen = sessionStorage.getItem(key);

    // 개발 중 항상 보여주고 싶으면 아래 줄 주석 해제
    // const seen = null;

    if (seen) {
      setPhase('done');
      return;
    }

    const minMs = 1700; // 스플래시
    const outMs = 100; // 페이드아웃

    const t1 = window.setTimeout(() => setPhase('splash-out'), minMs);
    const t2 = window.setTimeout(() => {
      sessionStorage.setItem(key, '1');
      setPhase('done');
    }, minMs + outMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className={
          phase === 'done' ? 'page-in min-h-dvh' : 'page-hidden min-h-dvh'
        }
      >
        {children}
      </div>

      {phase !== 'done' && (
        <div className={phase === 'splash-out' ? 'splash-out' : 'splash-in'}>
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}
