export const LANGUAGES = [
  { id: 'en', name: '영어', sub: 'English', flag: '🇺🇸' },
  { id: 'cn', name: '중국어', sub: '中文', flag: '🇨🇳' },
  { id: 'jp', name: '일본어', sub: '日本語', flag: '🇯🇵' },
  { id: 'vn', name: '베트남어', sub: 'Tiếng Việt', flag: '🇻🇳' },
  { id: 'th', name: '태국어', sub: 'ภาษาไทย', flag: '🇹🇭' },
  { id: 'ph', name: '필리핀어', sub: 'Filipino (Tagalog)', flag: '🇵🇭' },
  { id: 'id', name: '인도네시아어', sub: 'Bahasa Indonesia', flag: '🇮🇩' },
  { id: 'kh', name: '캄보디아어', sub: 'Khmer', flag: '🇰🇭' },
  { id: 'mm', name: '미얀마어', sub: 'Myanmar', flag: '🇲🇲' },
  { id: 'mn', name: '몽골어', sub: 'Mongol', flag: '🇲🇳' },
  { id: 'ru', name: '러시아어', sub: 'Русский', flag: '🇷🇺' },
  { id: 'bd', name: '뱅골어', sub: 'Bangla', flag: '🇧🇩' },
  { id: 'lk', name: '스리랑카어', sub: 'Sinhala', flag: '🇱🇰' },
  { id: 'np', name: '네팔어', sub: 'Nepali', flag: '🇳🇵' },
  { id: 'uz', name: '우즈베키스탄어', sub: "O'zbek tili", flag: '🇺🇿' },
  { id: 'kr', name: '한국어', sub: '한국어', flag: '🇰🇷' },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]['id'];

export const NAME_TO_ID = Object.fromEntries(
  LANGUAGES.map((lang) => [lang.name, lang.id]),
) as Record<string, LanguageId>;

export const ID_TO_NAME = Object.fromEntries(
  LANGUAGES.map((lang) => [lang.id, lang.name]),
) as Record<LanguageId, string>;

export type LanguageInfo = {
  id: string;
  name: string;
  sub: string;
  flag: string;
};

export const mapLanguages = (ids: string[]): LanguageInfo[] =>
  ids.map((id) => {
    const info = LANGUAGES.find((l) => l.id === id);
    return {
      id,
      name: info?.name || id,
      sub: info?.sub || '',
      flag: info?.flag || '🌐',
    };
  });
