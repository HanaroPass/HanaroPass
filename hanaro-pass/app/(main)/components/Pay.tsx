'use client';

import type { ReactNode } from 'react';
import { use, useCallback, useMemo, useState } from 'react';
import { useCardLock } from '@/hooks/card/useCardLock';
import type { ActionResult } from '@/lib/errorHandler';
import type { UserCardResponse } from '../actions/getUserCards.schema';
import Card from './Card';
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

  const { unlockedCardIds, unlockCard } = useCardLock();
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);

  const handleUnlockRequest = useCallback((id: number) => {
    setPendingCardId(id);
  }, []);

  const handlePinSuccess = useCallback(() => {
    if (pendingCardId === null) return;
    unlockCard(pendingCardId);
    setPendingCardId(null);
  }, [pendingCardId, unlockCard]);

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

      {pendingCardId !== null && (
        <PinInput
          onSuccessAction={handlePinSuccess}
          onCloseAction={() => setPendingCardId(null)}
        />
      )}
    </div>
  );
}
