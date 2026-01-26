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

  const searchExchanges = useCallback(async () => {
    const isSameRegion = lastSearchedRegionRef.current === currentMapRegion;

    if (isSameRegion) return exchangeResults;

    setIsLoading(true);

    try {
      const regions = currentMapRegion.split(' ');
      const guName = regions[0] || '';
      const dongName = regions[1] || '';
      const keywords = ['환전', '환전소', '머니박스', '무인환전'];

      const allQueries = keywords.flatMap((word) => [
        `${guName} ${guName} ${word}`,
        `${guName} ${dongName} ${word}`,
        `${dongName} ${word}`,
      ]);

      const results = await Promise.allSettled(
        allQueries.map((q) => fetchExchanges(q)),
      );

      const allRawItems = results.reduce((acc, result) => {
        if (result.status === 'fulfilled') {
          acc.push(...result.value);
        }
        return acc;
      }, [] as NaverLocalSearchItem[]);

      const itemMap = new Map<string, NaverSearchResult>();
      for (const item of allRawItems) {
        if (!item.mapx || !item.mapy) continue;

        const coordinateKey = `${item.mapx}-${item.mapy}`;
        if (!itemMap.has(coordinateKey)) {
          itemMap.set(coordinateKey, {
            title: item.title.replace(/<[^>]*>?/g, '').trim(),
            roadAddress: item.roadAddress,
            telephone: item.telephone,
            category: item.category,
            mapx: item.mapx,
            mapy: item.mapy,
          });
        }
      }

      const uniqueResults = Array.from(itemMap.values());

      // 데이터 세팅
      setExchangeResults(uniqueResults);

      // 성공 시 갱신
      lastSearchedRegionRef.current = currentMapRegion;

      return uniqueResults;
    } catch (error) {
      console.error('Exchange search failed:', error);

      // 실패, 다음 번에 재시도 가능하도록 ref 비움
      lastSearchedRegionRef.current = '';
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [currentMapRegion, exchangeResults]);

  const clearResults = useCallback(() => {
    setExchangeResults([]);
    lastSearchedRegionRef.current = '';
  }, []);

  return { exchangeResults, searchExchanges, clearResults, isLoading };
}
