type GoogleTranslateResponse = {
  data: {
    translations: {
      translatedText: string;
    }[];
  };
};

/**
 * @description Google Cloud Translation API를 사용해 번역합니다.
 */
export async function translateWithGoogle(
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
    const translations = result?.data?.translations;
    if (!translations) return [];
    return translations.map((t) => t.translatedText);
  } catch (e) {
    console.error('Google Translation Failed:', e);
    return [];
  }
}
