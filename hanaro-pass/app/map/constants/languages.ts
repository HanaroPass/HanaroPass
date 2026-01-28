export const LANGUAGES = [
  "영어",
  "중국어",
  "일본어",
  "베트남어",
  "태국어",
  "필리핀어",
  "인도네시아어",
  "캄보디아어",
  "미얀마어",
  "몽골어",
  "러시아어",
  "뱅골어",
  "스리랑카어",
  "네팔어",
  "우즈베키스탄어",
  "한국어",
] as const;

export type Language = (typeof LANGUAGES)[number];

