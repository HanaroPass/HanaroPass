'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { cardLockStorage } from '@/lib/cardStorage';

type GateState =
  | { isOpen: false; cardId: null }
  | { isOpen: true; cardId: number };

export function useCardLockGate() {
  const [unlocked, setUnlocked] = useState<Set<number>>(() => new Set());
  const [gate, setGate] = useState<GateState>({ isOpen: false, cardId: null });

  // mount 시 세션에서 로드
  useEffect(() => {
    setUnlocked(cardLockStorage.loadUnlockedSet());
  }, []);

  const isUnlocked = useCallback(
    (cardId: number) => unlocked.has(cardId),
    [unlocked],
  );

  const requestUnlock = useCallback((cardId: number) => {
    setGate({ isOpen: true, cardId });
  }, []);

  const closeGate = useCallback(() => {
    setGate({ isOpen: false, cardId: null });
  }, []);

  const confirmUnlock = useCallback(() => {
    if (!gate.isOpen) return;

    const cardId = gate.cardId;
    setUnlocked((prev) => {
      if (prev.has(cardId)) return prev;
      const next = new Set(prev);
      next.add(cardId);
      cardLockStorage.saveUnlockedSet(next);
      return next;
    });

    closeGate();
  }, [gate, closeGate]);

  const pendingCardId = useMemo(
    () => (gate.isOpen ? gate.cardId : null),
    [gate],
  );

  return {
    // 상태
    unlockedCardIds: unlocked, // Pay에서 그대로 쓰고 싶으면 제공
    isUnlocked,

    // 액션
    requestUnlock, // 카드 눌렀을 때 PIN 열기
    pendingCardId,
    closeGate,
    confirmUnlock, // PIN 성공 시 호출
  };
}
