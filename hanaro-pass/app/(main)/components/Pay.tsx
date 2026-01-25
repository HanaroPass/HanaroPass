'use client';

import { use, useCallback, useState } from 'react';
import type { UserCardResponse } from '../actions/getUserCards.schema';
import Card from './Card';
import CouponList from './CouponList';
import { MenuList } from './MenuList';
import PinInput from './PinInput';

interface PayProps {
  cardsPromise: Promise<UserCardResponse[]> | null;
}

export default function Pay({ cardsPromise }: PayProps) {
  const cards = cardsPromise ? use(cardsPromise) : [];

  const [unlockedCardIds, setUnlockedCardIds] = useState<Set<number>>(
    new Set(),
  );
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);

  const handleUnlockRequest = useCallback((id: number) => {
    setPendingCardId(id);
  }, []);

  const handlePinSuccess = useCallback(() => {
    if (pendingCardId) {
      setUnlockedCardIds((prev) => {
        const next = new Set(prev);
        next.add(pendingCardId);
        return next;
      });
      setPendingCardId(null);
    }
  }, [pendingCardId]);

  return (
    <div className="relative flex flex-col gap-5 pb-16.25">
      <Card
        cards={cards}
        unlockedCardIds={unlockedCardIds}
        onLockClickAction={handleUnlockRequest}
      />

      <CouponList />
      <MenuList type="pay" />

      {pendingCardId && (
        <PinInput
          onSuccessAction={handlePinSuccess}
          onCloseAction={() => setPendingCardId(null)}
        />
      )}
    </div>
  );
}
