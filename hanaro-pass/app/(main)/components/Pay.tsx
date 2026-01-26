'use client';

import type { ReactNode } from 'react';
import { use, useCallback, useMemo, useState } from 'react';
import type { ActionResult } from '@/lib/error-handler';
import type { UserCardResponse } from '../actions/getUserCards.schema';
import Card from './Card';
import DevTopUpButton from './DevTopUpButton';
import { MenuList } from './MenuList';
import PinInput from './PinInput';

interface PayProps {
  cardsPromise?: Promise<ActionResult<UserCardResponse[]>>;
  couponList?: ReactNode;
}

export default function Pay({ cardsPromise, couponList }: PayProps) {
  const result = cardsPromise ? use(cardsPromise) : null;

  const cards = useMemo(() => {
    if (!result) return [];
    if (!result.success) return [];
    return result.data;
  }, [result]);

  const errorMessage = !result ? null : result.success ? null : result.message;

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
      {errorMessage && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

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
