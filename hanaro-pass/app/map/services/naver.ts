'use server';

interface NaverSearchItem {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

interface NaverSearchResponse {
  items: NaverSearchItem[];
}

interface GoogleTranslateResponse {
  data: {
    translations: {
      translatedText: string;
    }[];
  };
}

/**
 * @function fetchExchanges
 * @description 네이버 검색 결과를 가져와 필요 시 구글 번역 API로 번역하여 반환합니다.
 */
export async function fetchExchanges(
  query: string,
  lang: 'ko' | 'en' = 'ko',
  start = '1',
): Promise<NaverSearchItem[]> {
  const clientId = process.env.NAVER_SEARCH_ID;
  const clientSecret = process.env.NAVER_SEARCH_SECRET;
  const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  // API 키 확인
  if (!clientId || !clientSecret) {
    console.error('Naver API keys are missing');
    return [];
  }

  // 파라미터 검증 및 정규화
  const startValue = Number.parseInt(start, 10);
  const safeStart =
    !Number.isNaN(startValue) && startValue > 0 ? String(startValue) : '1';

  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    query,
  )}&start=${safeStart}&display=20&sort=sim`;

  // 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 번역 고려 + 5000

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`Naver API Error: ${response.status}`);
      return [];
    }

    const data: NaverSearchResponse = await response.json();
    const items = data.items || [];

    if (lang === 'en' && googleApiKey && items.length > 0) {
      const textsToTranslate = items.flatMap((item) => [
        item.title.replace(/<[^>]*>?/g, '').trim(),
        item.roadAddress || item.address,
      ]);

      const translatedTexts = await translateWithGoogle(
        textsToTranslate,
        googleApiKey,
      );

      return items.map((item, index) => ({
        ...item,
        title: translatedTexts[index * 2] || item.title,
        roadAddress: translatedTexts[index * 2 + 1] || item.roadAddress,
      }));
    }

    return items;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timed out');
    }
    console.error('Server Action Error:', error);
    return [];
  } finally {
    // 타이머 해제
    clearTimeout(timeoutId);
  }
}

/**
 * @description Google Cloud Translation API를 사용해 번역합니다.
 */
async function translateWithGoogle(
  texts: string[],
  apiKey: string,
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: texts,
          target: 'en',
          source: 'ko',
          format: 'text',
        }),
      },
    );

    if (!response.ok) return [];

    const result: GoogleTranslateResponse = await response.json();
    return result.data.translations.map((t) => t.translatedText);
  } catch (e) {
    console.error('Google Translation Failed:', e);
    return [];
  }
}
