'use server';

export async function fetchExchanges(query: string, start = '1') {
  const clientId = process.env.NAVER_SEARCH_ID;
  const clientSecret = process.env.NAVER_SEARCH_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Naver API keys are missing');
    return [];
  }

  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
    query,
  )}&start=${start}&display=20&sort=sim`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Server Action Error:', error);
    return [];
  }
}
