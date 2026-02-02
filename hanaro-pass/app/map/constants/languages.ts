export const LANGUAGES = [
  '영어',
  '중국어',
  '일본어',
  '베트남어',
  '태국어',
  '필리핀어',
  '인도네시아어',
  '캄보디아어',
  '미얀마어',
  '몽골어',
  '러시아어',
  '뱅골어',
  '스리랑카어',
  '네팔어',
  '우즈베키스탄어',
  '한국어',
] as const;

export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_TRANSLATIONS: Record<
  Language,
  { ko: string; en: string }
> = {
  영어: { ko: '영어', en: 'English' },
  중국어: { ko: '중국어', en: 'Chinese' },
  일본어: { ko: '일본어', en: 'Japanese' },
  베트남어: { ko: '베트남어', en: 'Vietnamese' },
  태국어: { ko: '태국어', en: 'Thai' },
  필리핀어: { ko: '필리핀어', en: 'Filipino' },
  인도네시아어: { ko: '인도네시아어', en: 'Indonesian' },
  캄보디아어: { ko: '캄보디아어', en: 'Khmer' },
  미얀마어: { ko: '미얀마어', en: 'Burmese' },
  몽골어: { ko: '몽골어', en: 'Mongolian' },
  러시아어: { ko: '러시아어', en: 'Russian' },
  뱅골어: { ko: '뱅골어', en: 'Bengali' },
  스리랑카어: { ko: '스리랑카어', en: 'Sinhala' },
  네팔어: { ko: '네팔어', en: 'Nepali' },
  우즈베키스탄어: { ko: '우즈베키스탄어', en: 'Uzbek' },
  한국어: { ko: '한국어', en: 'Korean' },
};
