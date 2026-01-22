import type { CardColor } from './cardColor';

// 서류 카드 정체성
export const DOCS_CARD_ITEMS = [
  { id: 'passport', title: '모바일 여권', color: 'peach' },
  { id: 'arc', title: '모바일 외국인 신분증', color: 'blueSoft' },
  { id: 'student', title: '외국인 학생증', color: 'purple' },
  { id: 'copy', title: '여권 사본', color: 'blueStrong' },
  { id: 'photo', title: '여권 사진', color: 'gray' },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  color: CardColor;
}>;

export type DocsCardId = (typeof DOCS_CARD_ITEMS)[number]['id'];
export type DocsCardItem = (typeof DOCS_CARD_ITEMS)[number];

export type DocRequirement =
  | { kind: 'PASSPORT' }
  | { kind: 'ARC' }
  | { kind: 'USER_DOC'; docType: 'STUDENT_ID' | 'COPY' | 'PHOTO' };

// 서류 카드 - DB 맞추기
export const DOC_ID_TO_REQUIREMENT: Record<DocsCardId, DocRequirement> = {
  passport: { kind: 'PASSPORT' },
  arc: { kind: 'ARC' },
  student: { kind: 'USER_DOC', docType: 'STUDENT_ID' },
  copy: { kind: 'USER_DOC', docType: 'COPY' },
  photo: { kind: 'USER_DOC', docType: 'PHOTO' },
} as const;
