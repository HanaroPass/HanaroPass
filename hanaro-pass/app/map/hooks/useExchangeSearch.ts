'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { NaverSearchResult } from '../components/ui/NaverMap';
import {
  fetchExchanges,
  type NaverSearchItem,
  translateItems,
} from '../services/naver';

export function useExchangeSearch(
  currentMapRegion: string,
  lang: 'ko' | 'en' = 'ko',
) {
  const [exchangeResults, setExchangeResults] = useState<NaverSearchResult[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const lastSearchedRegionRef = useRef('');
  const lastTranslatedLangRef = useRef(lang);
  const latestRequestIdRef = useRef(0);

  const searchExchanges = useCallback(
    async (force = false, manualRegion?: string) => {
      const targetRegion = manualRegion || currentMapRegion;

      if (!force && targetRegion === lastSearchedRegionRef.current) return;

      const requestId = ++latestRequestIdRef.current;
      setIsLoading(true);

      try {
        const regions = targetRegion.split(lang === 'ko' ? ' ' : ', ');
        const guName = regions[0] || '';
        const dongName = regions[1] || '';

        // 검색어 한국어 고정
        const keywords = ['환전', '환전소', '무인환전', '머니박스'];
        const allQueries = keywords.flatMap((word) => [
          `${guName} ${dongName} ${word}`,
          `${dongName} ${word}`,
        ]);

        const results = await Promise.allSettled(
          allQueries.map((q) => fetchExchanges(q)),
        );

        if (requestId !== latestRequestIdRef.current) return;

        const newItemMap = new Map<string, NaverSearchResult>();
        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            result.value.forEach((item: NaverSearchItem) => {
              const key = `${item.mapx}-${item.mapy}`;
              if (!newItemMap.has(key)) {
                newItemMap.set(key, {
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

        let newItems = Array.from(newItemMap.values());

        if (lang === 'en' && newItems.length > 0) {
          const itemsToTranslate = newItems.map(
            (res) => ({ ...res, address: '' }) as NaverSearchItem,
          );
          const translated = await translateItems(itemsToTranslate, 'en');
          newItems = translated.map((t) => ({
            title: t.title,
            roadAddress: t.roadAddress,
            telephone: t.telephone,
            category: t.category,
            mapx: t.mapx,
            mapy: t.mapy,
          }));
        }

        setExchangeResults((prev) => {
          const finalMap = new Map<string, NaverSearchResult>();
          newItems.forEach((item) => {
            finalMap.set(`${item.mapx}-${item.mapy}`, item);
          });

          if (lastSearchedRegionRef.current === targetRegion) {
            prev.forEach((item) => {
              const key = `${item.mapx}-${item.mapy}`;
              if (!finalMap.has(key)) finalMap.set(key, item);
            });
          }

          return Array.from(finalMap.values()).slice(0, 30);
        });

        lastSearchedRegionRef.current = targetRegion;
      } catch (error) {
        console.error('Exchange search failed:', error);
      } finally {
        if (requestId === latestRequestIdRef.current) setIsLoading(false);
      }
    },
    [currentMapRegion, lang],
  );

  const clearResults = useCallback(() => {
    setExchangeResults([]);
    lastSearchedRegionRef.current = '';
    lastTranslatedLangRef.current = lang;
    setIsLoading(false);
  }, [lang]);

  useEffect(() => {
    if (lastTranslatedLangRef.current === lang) return;

    setExchangeResults([]);
    lastSearchedRegionRef.current = '';
    lastTranslatedLangRef.current = lang;

    if (currentMapRegion) {
      searchExchanges(true);
    }
  }, [lang, currentMapRegion, searchExchanges]);

  return { exchangeResults, searchExchanges, clearResults, isLoading };
}
