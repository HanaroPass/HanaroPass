'use client';

import type { ReactNode } from 'react';
import { use, useCallback, useMemo } from 'react';
import type { ActionResult } from '@/lib/errorHandler';
import type { UserCardResponse } from '../actions/getUserCards.schema';
import { useCardLockGate } from '../hooks/useCardLock';
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
    if (!result || !result.success) return [];
    return result.data;
  }, [result]);

  const errorMessage = !result ? null : result.success ? null : result.message;

  const gate = useCardLockGate();

  const handleUnlockRequest = useCallback(
    (id: number) => {
      gate.requestUnlock(id);
    },
    [gate],
  );

  return (
    <div className="relative flex flex-col gap-5 pb-16.25">
      {errorMessage && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <Card
        cards={cards}
        unlockedCardIds={gate.unlockedCardIds}
        onLockClickAction={handleUnlockRequest}
      />

      {couponList}

      <MenuList type="pay" />

      {gate.pendingCardId !== null && (
        <PinInput
          onSuccessAction={gate.confirmUnlock}
          onCloseAction={gate.closeGate}
        />
      )}
    </div>
  );
}
