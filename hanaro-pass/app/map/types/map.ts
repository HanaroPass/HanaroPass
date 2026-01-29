export type SheetType =
  | 'hospital'
  | 'embassy'
  | 'exchange'
  | 'siren'
  | 'bookmark';
export type SheetPosition = 'closed' | 'half' | 'full';

export const SHEET_TITLE: Record<SheetType, string> = {
  hospital: '병원 정보',
  embassy: '대사관 정보',
  exchange: '환전소 정보',
  siren: '긴급 상황',
  bookmark: '결제 장소 정보',
};

export type MapBounds = {
  south: number;
  west: number;
  north: number;
  east: number;
};
