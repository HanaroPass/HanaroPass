'use server';

/**
 * @function fetchExchanges
 * @description 네이버 지역 검색 API를 호출하여 환전소 정보를 가져옵니다.
 * @param query 검색 키워드
 * @param start 검색 시작 위치 (문자열로 받아서 내부에서 숫자로 검증)
 */
export async function fetchExchanges(query: string, start = '1') {
  const clientId = process.env.NAVER_SEARCH_ID;
  const clientSecret = process.env.NAVER_SEARCH_SECRET;

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
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
      cache: 'no-store',
      signal: controller.signal, // 타임아웃 신호 전달
    });

    // 에러 로깅 강화
    if (!response.ok) {
      console.error(
        `Naver API Error: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    // 타임아웃 처리
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Naver API request timed out after 10 seconds');
      return [];
    }

    console.error('Server Action Error:', error);
    return [];
  } finally {
    // 타이머 해제
    clearTimeout(timeoutId);
  }
}
