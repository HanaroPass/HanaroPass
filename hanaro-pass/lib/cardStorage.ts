const STORAGE_KEY = 'cardLock';

type Stored = {
  unlockedCardIds: number[];
};

function read(): Stored {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { unlockedCardIds: [] };
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return {
      unlockedCardIds: Array.isArray(parsed.unlockedCardIds)
        ? parsed.unlockedCardIds.filter((x) => Number.isFinite(x))
        : [],
    };
  } catch {
    return { unlockedCardIds: [] };
  }
}

function write(next: Stored) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export const cardLockStorage = {
  loadUnlockedSet(): Set<number> {
    return new Set(read().unlockedCardIds);
  },

  saveUnlockedSet(set: Set<number>) {
    write({ unlockedCardIds: Array.from(set) });
  },
};
