import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const start = searchParams.get('start') || '1';
  const display = searchParams.get('display') || '5';

  const sort = 'sim';

  const clientId = process.env.NAVER_SEARCH_ID;
  const clientSecret = process.env.NAVER_SEARCH_SECRET;

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(
      query,
    )}&start=${start}&display=${display}&sort=${sort}`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-Naver-Client-Id': clientId ?? '',
        'X-Naver-Client-Secret': clientSecret ?? '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Naver API Error: ${response.status} - ${errorData}`);
      return NextResponse.json({ items: [] });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Server Internal Error:', error);
    return NextResponse.json({ items: [] });
  }
}
