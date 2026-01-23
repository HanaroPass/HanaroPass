'use client';

import { useState } from 'react';
import { MOCK_CARDS } from '../mock/mockCard';
import Card from './Card';
import CouponList from './CouponList';
import MenuList from './MenuList';
import PinInput from './PinInput';

export default function Pay() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="relative flex flex-col gap-5">
      <Card
        isUnlocked={isUnlocked}
        onLockClickAction={() => setShowPin(true)}
        cards={MOCK_CARDS}
      />

      <CouponList />

      <MenuList type="pay" />

      {showPin && (
        <PinInput
          onSuccessAction={() => {
            setIsUnlocked(true);
            setShowPin(false);
          }}
          onCloseAction={() => setShowPin(false)}
        />
      )}
    </div>
  );
}
