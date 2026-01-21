import type { CardColor } from './cardColor';

export type DocsCardItem = {
  id: string;
  title: string;
  color: CardColor;
};

export const DOCS_CARD_ITEMS: DocsCardItem[] = [
  { id: 'passport', title: '모바일 여권', color: 'peach' },
  { id: 'arc', title: '모바일 외국인 신분증', color: 'blueSoft' },
  { id: 'student', title: '외국인 학생증', color: 'purple' },
  { id: 'copy', title: '여권 사본', color: 'blueStrong' },
  { id: 'photo', title: '여권 사진', color: 'gray' },
] as const;
