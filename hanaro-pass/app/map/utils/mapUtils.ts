import type { Embassy, SavedPlace } from '@/lib/generated/prisma';

import type { NaverSearchResult } from '../components/ui/NaverMap';
import type { LocationInfo } from '../components/ui/PlaceCard';
import type { ClickablePlace } from '../hooks/useMapMarkers';
import type { Hospital } from '../mapPageClient';

const CATEGORY_MAP: Record<string, string> = {
  CAFE: '카페',
  FOOD: '식당',
  SHOP: '쇼핑',
};

const BANK_KEYWORDS = [
  '국민',
  '신한',
  '우리',
  '하나',
  '농협',
  '기업',
  '씨티',
  'SC제일',

  '부산',
  '대구',
  '광주',
  '전북',
  '경남',
  '제주',

  '새마을금고',
  '신협',
  '수협',
  '우체국',

  'KDB',
  '산업은행',
  '케이뱅크',
  '카카오뱅크',
  '토스뱅크',

  'bank',
];

function getExchangeType(name: string): '은행' | '환전소' | '기타' {
  if (!name) return '기타';

  const lower = name.toLowerCase();

  if (
    name.includes('은행') ||
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
  ];

  if (exchangeKeywords.some((k) => name.includes(k))) {
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
