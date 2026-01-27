import type { Embassy, SavedPlace } from '@/lib/generated/prisma';

import type { NaverSearchResult } from '../components/ui/NaverMap';
import type { LocationInfo } from '../components/ui/PlaceCard';
import type { Hospital } from '../hooks/useHospitalFilters';
import type { ClickablePlace } from '../hooks/useMapMarkers';

const CATEGORY_MAP: Record<string, string> = {
  CAFE: '카페',
  FOOD: '식당',
  SHOP: '쇼핑',
};

// 병원 운영 상태 계산 함수
export function getHospitalStatus(openHours: string): '진료 중' | '진료 종료' {
  const [open, close] = openHours.split('-');
  const now = new Date();
  const [openH, openM] = open.split(':').map(Number);
  const [closeH, closeM] = close.split(':').map(Number);

  const openTime = new Date(now);
  openTime.setHours(openH, openM, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeH, closeM, 0, 0);

  return now >= openTime && now < closeTime ? '진료 중' : '진료 종료';
}

// HTML 태그 제거 및 데이터 포맷팅
export const formatExchangeData = (
  results: NaverSearchResult[],
): LocationInfo[] => {
  return results.map((item) => ({
    id: `${item.mapx}-${item.mapy}`,
    name: item.title.replace(/<[^>]*>?/g, ''),
    type: '환전소',
    address: item.roadAddress || item.address || '',
    phone: item.telephone || '',
    distance: '',
    status: '',
    explainTime: '',
    latitude: item.mapy || '',
    longitude: item.mapx || '',
  }));
};

// 다양한 DB 타입을 LocationInfo 타입으로 변환
export const mapDbToInfo = (
  db: SavedPlace | Embassy | NaverSearchResult,
): LocationInfo => {
  if ('mapx' in db) {
    return {
      id: `${db.mapx}-${db.mapy}`,
      name: db.title.replace(/<[^>]*>?/g, ''),
      type: '환전소',
      address: db.roadAddress || db.address || '',
      phone: db.telephone || '',
      distance: '',
      status: '',
      explainTime: '',
      latitude: db.mapy || '',
      longitude: db.mapx || '',
    };
  }
  const { address, phone } = db;
  const type =
    'category' in db ? CATEGORY_MAP[db.category] || '기타' : '대사관, 영사관';
  return {
    id: db.id,
    name: db.placeName,
    type,
    address,
    phone,
    explainTime: db.openHours,
    distance: '',
    latitude: db.latitude,
    longitude: db.longitude,
  };
};

const hasKey = <T extends object>(obj: T, key: string): boolean => key in obj;

export const isHospitalPlace = (place: ClickablePlace): place is Hospital =>
  hasKey(place, 'departments');

export const isEmbassy = (place: ClickablePlace): place is Embassy =>
  hasKey(place, 'nationality');

export const isExchangePlace = (
  place: ClickablePlace,
): place is NaverSearchResult =>
  hasKey(place, 'mapx') && hasKey(place, 'title');

export const isSavedPlace = (place: ClickablePlace): place is SavedPlace =>
  hasKey(place, 'placeName');
