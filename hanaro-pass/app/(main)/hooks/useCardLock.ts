import { useCallback, useEffect, useState } from 'react';

export function useCardLock() {
  const [unlockedCardIds, setUnlockedCardIds] = useState<Set<number>>(
    new Set(),
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsClient(true);

    import('@/lib/cardStorage').then(({ cardLockStorage }) => {
      setUnlockedCardIds(cardLockStorage.getUnlockedCardIds());
    });
  }, []);

  const unlockCard = useCallback(
    async (cardId: number) => {
      if (!isClient) return;

      const { cardLockStorage } = await import('@/lib/cardStorage');
      cardLockStorage.addUnlockedCardId(cardId);

      setUnlockedCardIds((prev) => {
        const next = new Set(prev);
        next.add(cardId);
        return next;
      });
    },
    [isClient],
  );

  const lockCard = useCallback(
    async (cardId: number) => {
      if (!isClient) return;

      const { cardLockStorage } = await import('@/lib/cardStorage');
      cardLockStorage.removeUnlockedCardId(cardId);

      setUnlockedCardIds((prev) => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
    },
    [isClient],
  );

  return {
    unlockedCardIds,
    unlockCard,
    lockCard,
    isClient,
  };
}
