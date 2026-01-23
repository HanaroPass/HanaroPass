'use client';

import { useCallback, useState } from 'react';
import { MOCK_CARDS } from '../mock/mockCard';
import Card from './Card';
import CouponList from './CouponList';
import MenuList from './MenuList';
import PinInput from './PinInput';

export default function Pay() {
  const [unlockedCardIds, setUnlockedCardIds] = useState<Set<number>>(
    new Set(),
  );
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);

  const handleUnlockRequest = useCallback((id: number) => {
    setPendingCardId(id);
  }, []);

  const handlePinSuccess = useCallback(() => {
    if (pendingCardId) {
      setUnlockedCardIds((prev) => new Set(prev).add(pendingCardId));
      setPendingCardId(null);
    }
  }, [pendingCardId]);

  return (
    <div className="relative flex flex-col gap-5 pb-16.25">
      <Card
        cards={MOCK_CARDS}
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
