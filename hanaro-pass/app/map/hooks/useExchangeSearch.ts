'use client';

import { useCallback, useRef, useState } from 'react';
import type { NaverSearchResult } from '../components/ui/NaverMap';
import { fetchExchanges } from '../services/naver';

type NaverLocalSearchItem = {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
};

export function useExchangeSearch(currentMapRegion: string) {
  const [exchangeResults, setExchangeResults] = useState<NaverSearchResult[]>(
    [],
  );
  const lastSearchedRegionRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  const searchExchanges = useCallback(
    async (force = false) => {
      if (
        !force &&
        (!currentMapRegion ||
          lastSearchedRegionRef.current === currentMapRegion)
      ) {
        return;
      }

      setIsLoading(true);

      try {
        const regions = currentMapRegion.split(' ');
        const guName = regions[0] || '';
        const dongName = regions[1] || '';
        const keywords = ['환전', '환전소', '무인환전', '머니박스'];

        const allQueries = keywords.flatMap((word) => [
          `${guName} ${dongName} ${word}`,
          `${dongName} ${word}`,
        ]);

        const results = await Promise.allSettled(
          allQueries.map((q) => fetchExchanges(q)),
        );

        const isAnySuccess = results.some(
          (r) => r.status === 'fulfilled' && r.value && r.value.length > 0,
        );

        setExchangeResults((prev) => {
          // 새로운 데이터를 먼저
          const itemMap = new Map<string, NaverSearchResult>();

          results.forEach((result) => {
            if (result.status === 'fulfilled') {
              result.value.forEach((item: NaverLocalSearchItem) => {
                const key = `${item.mapx}-${item.mapy}`;
                if (!itemMap.has(key)) {
                  itemMap.set(key, {
                    title: item.title.replace(/<[^>]*>?/g, '').trim(),
                    roadAddress: item.roadAddress,
                    telephone: item.telephone,
                    category: item.category,
                    mapx: item.mapx,
                    mapy: item.mapy,
                  });
                }
              });
            }
          });

          prev.forEach((item) => {
            const key = `${item.mapx}-${item.mapy}`;
            if (!itemMap.has(key)) itemMap.set(key, item);
          });

          return Array.from(itemMap.values()).slice(0, 30);
        });

        if (isAnySuccess) {
          lastSearchedRegionRef.current = currentMapRegion;
        }
      } catch (error) {
        console.error('Exchange search failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentMapRegion],
  );

  const clearResults = useCallback(() => {
    setExchangeResults([]);
    lastSearchedRegionRef.current = '';
  }, []);

  return { exchangeResults, searchExchanges, clearResults, isLoading };
}
