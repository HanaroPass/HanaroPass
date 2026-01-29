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
export function getHospitalStatus(
  openHours: string,
  hospitalName?: string,
): '진료 중' | '진료 종료' {
  if (is24HoursHospital(hospitalName)) {
    return '진료 중';
  }
  if (!openHours || !openHours.includes('-')) return '진료 종료';

  try {
    const [open, close] = openHours.split('-');
    const now = new Date();

    const [openH, openM] = open.split(':').map(Number);
    const [closeH, closeM] = close.split(':').map(Number);

    const openTime = new Date(now);
    openTime.setHours(openH, openM, 0, 0);

    const closeTime = new Date(now);
    closeTime.setHours(closeH, closeM, 0, 0);

    if (closeTime <= openTime) {
      closeTime.setDate(closeTime.getDate() + 1);
    }

    const isOpen = now >= openTime && now < closeTime;

    return isOpen ? '진료 중' : '진료 종료';
  } catch {
    return '진료 종료';
  }
}

// 24시간 병원 여부 판단
export function is24HoursHospital(name?: string) {
  if (!name) return false;
  return name.includes('24') || name.includes('365');
}

// 운영 시간 파싱
export const parseOpenHours = (openHours: string, hospitalName?: string) => {
  if (is24HoursHospital(hospitalName)) {
    return { openTime: '24시간', closeTime: '' };
  }

  if (!openHours || !openHours.includes('-')) {
    return { openTime: '정보 없음', closeTime: '' };
  }

  try {
    const [openTime, closeTime] = openHours.split('-');
    return {
      openTime: openTime || '정보 없음',
      closeTime: closeTime || '',
    };
  } catch {
    return { openTime: '정보 없음', closeTime: '' };
  }
};

const BANK_KEYWORDS = [
  '국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  '농협은행',
  'NH농협',
  '기업은행',
  '씨티은행',
  'SC제일은행',
  '산업은행',
  'KDB',
  '부산은행',
  '광주은행',
  '전북은행',
  '경남은행',
  '제주은행',
  '새마을금고',
  '신협',
  '수협',
  '우체국',
  '케이뱅크',
  '카카오뱅크',
  '토스뱅크',
  'bank',
  'iM뱅크',
];

export function getExchangeType(name: string): '은행' | '환전소' | '기타' {
  if (!name) return '기타';

  const lower = name.toLowerCase();

  if (
    lower.includes('은행') ||
    BANK_KEYWORDS.some((k) => lower.includes(k.toLowerCase()))
  ) {
    return '은행';
  }

  const exchangeKeywords = [
    '환전',
    '환전소',
    '머니박스',
    '익스체인지',
    'exchange',
    '환전기',
    '머니',
  ];
  if (exchangeKeywords.some((k) => lower.includes(k.toLowerCase()))) {
    return '환전소';
  }

  return '기타';
}

// HTML 태그 제거 및 데이터 포맷팅
export const formatExchangeData = (
  results: NaverSearchResult[],
): LocationInfo[] => {
  return results.map((item) => ({
    id: `${item.mapx}-${item.mapy}`,
    name: item.title.replace(/<[^>]*>?/g, ''),
    type: getExchangeType(item.title),
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
      type: getExchangeType(db.title),
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
