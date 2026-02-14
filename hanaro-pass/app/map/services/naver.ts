'use server';

import { translateWithGoogle } from './google';

export type NaverSearchItem = {
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

type NaverSearchResponse = {
  items: NaverSearchItem[];
};

/**
 * @function translateItems
 * @description 이미 검색된 아이템들의 title과 address를 번역합니다.
 */
export async function translateItems(
  items: NaverSearchItem[],
  lang: 'ko' | 'en',
): Promise<NaverSearchItem[]> {
  const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  // 영어 번역이 필요 없거나 키가 없으면 원본 반환
  if (lang !== 'en' || !googleApiKey || items.length === 0) return items;

  try {
    const stripHtml = (s: string) => s.replace(/<[^>]*>?/g, '').trim();

    // 번역할 텍스트 추출 (제목, 주소 순서 유지)
    const textsToTranslate = items.flatMap((item) => [
      stripHtml(item.title),
      item.roadAddress || item.address,
    ]);

    const translatedTexts = await translateWithGoogle(
      textsToTranslate,
      googleApiKey,
    );

    return items.map((item, index) => ({
      ...item,
      title: translatedTexts[index * 2] || stripHtml(item.title),
      roadAddress: translatedTexts[index * 2 + 1] || item.roadAddress,
    }));
  } catch (error) {
    console.error('Translation Error:', error);
    return items;
  }
}

export async function fetchExchanges(
  query: string,
  start = '1',
): Promise<NaverSearchItem[]> {
  const clientId = process.env.NAVER_SEARCH_ID;
  const clientSecret = process.env.NAVER_SEARCH_SECRET;

  if (!clientId || !clientSecret) return [];

  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    query,
  )}&start=${start}&display=20&sort=sim`;

  const response = await fetch(apiUrl, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
    cache: 'no-store',
  });

  if (!response.ok) return [];

  const data: NaverSearchResponse = await response.json();
  return data.items || [];
}
