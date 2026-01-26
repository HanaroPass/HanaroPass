'use client';

import type { ReactNode } from 'react';
import { use, useCallback, useState } from 'react';
import type { UserCardResponse } from '../actions/getUserCards.schema';
import Card from './Card';
import { MenuList } from './MenuList';
import PinInput from './PinInput';

interface PayProps {
  cardsPromise?: Promise<UserCardResponse[]> | null;
  couponList?: ReactNode;
}

export default function Pay({ cardsPromise, couponList }: PayProps) {
  const cards = cardsPromise ? use(cardsPromise) : [];

  const [unlockedCardIds, setUnlockedCardIds] = useState<Set<number>>(
    new Set(),
  );
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);

  const handleUnlockRequest = useCallback((id: number) => {
    setPendingCardId(id);
  }, []);

  const handlePinSuccess = useCallback((cardId: number | null) => {
    if (cardId == null) return;

    setUnlockedCardIds((prev) => {
      if (prev.has(cardId)) return prev;
      const next = new Set(prev);
      next.add(cardId);
      return next;
    });

    setPendingCardId(null);
  }, []);

  return (
    <div className="relative flex flex-col gap-5 pb-16.25">
      <Card
        cards={cards}
        unlockedCardIds={unlockedCardIds}
        onLockClickAction={handleUnlockRequest}
      />

      {couponList}

      <MenuList type="pay" />

      {pendingCardId && (
        <PinInput
          onSuccessAction={() => handlePinSuccess(pendingCardId)}
          onCloseAction={() => setPendingCardId(null)}
        />
      )}
    </div>
  );
}
