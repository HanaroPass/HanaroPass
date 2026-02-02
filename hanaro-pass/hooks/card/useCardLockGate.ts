import { useEffect, useState } from 'react';
import { getUserCardsAction } from '@/app/(main)/actions/getUserCards.action';

interface UseCardLockGateReturn {
  defaultCardId: number | null;
  isCardUnlocked: boolean;
  isLoading: boolean;
  unlockCard: () => Promise<void>;
}

/**
 * 카드 잠금 상태를 관리하는 통합 훅
 * - 클라이언트에서만 실행
 * - 기본 카드 정보 자동 로드
 * - 세션 스토리지로 잠금 상태 관리
 */
export function useCardLockGate(): UseCardLockGateReturn {
  const [defaultCardId, setDefaultCardId] = useState<number | null>(null);
  const [isCardUnlocked, setIsCardUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const loadCardData = async () => {
      try {
        const result = await getUserCardsAction();

        if (result.success) {
          const defaultCard = result.data.find((card) => card.isDefault);

          if (defaultCard) {
            setDefaultCardId(defaultCard.id);

            const { cardLockStorage } = await import('@/lib/cardStorage');
            const unlocked = cardLockStorage.isCardUnlocked(defaultCard.id);
            setIsCardUnlocked(unlocked);
          }
        }
      } catch (error) {
        console.error('[useCardLockGate] Failed to load card data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCardData();
  }, []);

  const unlockCard = async () => {
    if (defaultCardId === null) return;

    try {
      const { cardLockStorage } = await import('@/lib/cardStorage');
      cardLockStorage.addUnlockedCardId(defaultCardId);
      setIsCardUnlocked(true);
    } catch (error) {
      console.error('[useCardLockGate] Failed to unlock card:', error);
    }
  };

  return {
    defaultCardId,
    isCardUnlocked,
    isLoading,
    unlockCard,
  };
}
