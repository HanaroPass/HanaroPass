export type SheetType = 'hospital' | 'embassy' | 'exchange' | 'siren';
export type SheetPosition = 'closed' | 'half' | 'full';

export const SHEET_TITLE: Record<SheetType, string> = {
  hospital: '병원 정보',
  embassy: '대사관 정보',
  exchange: '환전소 정보',
  siren: '긴급 상황',
};