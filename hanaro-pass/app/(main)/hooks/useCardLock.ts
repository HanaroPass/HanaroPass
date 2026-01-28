'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { cardLockStorage } from '@/lib/cardStorage';

type GateState =
  | { isOpen: false; cardId: null }
  | { isOpen: true; cardId: number };

export function useCardLockGate() {
  const [unlocked, setUnlocked] = useState<Set<number>>(() => new Set());
  const [gate, setGate] = useState<GateState>({ isOpen: false, cardId: null });

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
    unlockedCardIds: unlocked,
    isUnlocked,
    requestUnlock,
    pendingCardId,
    closeGate,
    confirmUnlock,
  };
}
