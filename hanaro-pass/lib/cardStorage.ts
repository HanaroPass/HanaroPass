const STORAGE_KEY = 'unlocked_card_ids';

const isBrowser = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof window.sessionStorage !== 'undefined'
  );
};

export const cardLockStorage = {
  getUnlockedCardIds(): Set<number> {
    if (!isBrowser()) {
      return new Set();
    }

    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return new Set();
      }

      const parsed = JSON.parse(stored);
      const ids = Array.isArray(parsed)
        ? parsed.map((v) => Number(v)).filter(Number.isFinite)
        : [];
      return new Set(ids);
    } catch (error) {
      console.error(
        '[cardLockStorage] Failed to read unlocked card IDs:',
        error,
      );
      return new Set();
    }
  },

  addUnlockedCardId(cardId: number): void {
    if (!isBrowser()) {
      return;
    }

    try {
      const current = this.getUnlockedCardIds();
      current.add(cardId);
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(current)),
      );
    } catch (error) {
      console.error(
        '[cardLockStorage] Failed to save unlocked card ID:',
        error,
      );
    }
  },

  removeUnlockedCardId(cardId: number): void {
    if (!isBrowser()) {
      return;
    }

    try {
      const current = this.getUnlockedCardIds();
      current.delete(cardId);
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(current)),
      );
    } catch (error) {
      console.error(
        '[cardLockStorage] Failed to remove unlocked card ID:',
        error,
      );
    }
  },

  clearUnlockedCardIds(): void {
    if (!isBrowser()) {
      return;
    }

    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error(
        '[cardLockStorage] Failed to clear unlocked card IDs:',
        error,
      );
    }
  },

  isCardUnlocked(cardId: number): boolean {
    if (!isBrowser()) {
      return false;
    }

    return this.getUnlockedCardIds().has(cardId);
  },
};
