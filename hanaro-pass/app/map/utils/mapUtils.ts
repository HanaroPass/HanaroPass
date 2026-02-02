import type { Embassy, SavedPlace } from '@/lib/generated/prisma';
import type { NaverSearchResult } from '../components/ui/NaverMap';
import type { LocationInfo } from '../components/ui/PlaceCard';
import { CATEGORY_MAP } from '../constants/mapTranslations';
import type { Hospital } from '../hooks/useHospitalFilters';
import type { ClickablePlace } from '../hooks/useMapMarkers';

// 병원 운영 상태 계산 함수
export function getHospitalStatus(openHours: string): '진료 중' | '진료 종료' {
  if (openHours === '00:00 - 24:00') {
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

    return now >= openTime && now < closeTime ? '진료 중' : '진료 종료';
  } catch {
    return '진료 종료';
  }
}

// 24시간 병원 여부 판단
export function is24HoursHospitalByOpenHours(openHours?: string) {
  return openHours === '00:00 - 24:00';
}

// 운영 시간 파싱
export const parseOpenHours = (openHours: string) => {
  if (openHours === '00:00 - 24:00') {
    return { openTime: '24시간', closeTime: '' };
  }

  if (!openHours || !openHours.includes('-')) {
    return { openTime: '정보 없음', closeTime: '' };
  }

  const [openTime, closeTime] = openHours.split('-');
  return {
    openTime: openTime || '정보 없음',
    closeTime: closeTime || '',
  };
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

const EXCHANGE_CATEGORY_MAP = {
  ko: {
    은행: '은행',
    환전소: '환전소',
    기타: '기타',
  },
  en: {
    은행: 'Bank',
    환전소: 'Exchange',
    기타: 'Etc.',
  },
} as const;

// HTML 태그 제거 및 데이터 포맷팅
export const formatExchangeData = (
  results: NaverSearchResult[],
  lang: 'ko' | 'en' = 'ko',
): LocationInfo[] => {
  return results.map((item) => {
    const typeKey = getExchangeType(item.title);

    return {
      id: `${item.mapx}-${item.mapy}`,
      name: item.title.replace(/<[^>]*>?/g, ''),
      type: EXCHANGE_CATEGORY_MAP[lang][typeKey],
      address: item.roadAddress || item.address || '',
      phone: item.telephone || '',
      distance: '',
      status: '',
      explainTime: '',
      latitude: item.mapy || '',
      longitude: item.mapx || '',
    };
  });
};

export const mapDbToInfo = (
  db: SavedPlace | Embassy | NaverSearchResult,
  lang: 'ko' | 'en' = 'ko',
): LocationInfo => {
  if ('mapx' in db) {
    const typeKey = getExchangeType(db.title);

    const exchangeCategoryMap = {
      ko: {
        은행: '은행',
        환전소: '환전소',
        기타: '기타',
      },
      en: {
        은행: 'Bank',
        환전소: 'Exchange',
        기타: 'Etc.',
      },
    };

    return {
      id: `${db.mapx}-${db.mapy}`,
      name: db.title.replace(/<[^>]*>?/g, ''),
      type: exchangeCategoryMap[lang][typeKey],
      address: db.roadAddress || db.address || '',
      phone: db.telephone || '',
      distance: '',
      status: '',
      explainTime: '',
      latitude: db.mapy || '',
      longitude: db.mapx || '',
    };
  }

  const isSaved = 'category' in db;
  const currentCategoryMap = CATEGORY_MAP[lang];

  const translatedType = isSaved
    ? (currentCategoryMap as Record<string, string>)[db.category] ||
      currentCategoryMap.ETC
    : currentCategoryMap.EMBASSY;

  return {
    id: db.id,
    name: lang === 'ko' ? db.nameKo : db.nameEn || db.nameKo,
    type: translatedType,
    address: lang === 'ko' ? db.addressKo : db.addressEn || db.addressKo,
    phone: db.phone,
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
  hasKey(place, 'nationality') && hasKey(place, 'nameKo');

export const isExchangePlace = (
  place: ClickablePlace,
): place is NaverSearchResult =>
  hasKey(place, 'mapx') && hasKey(place, 'title');

export const isSavedPlace = (place: ClickablePlace): place is SavedPlace =>
  hasKey(place, 'nameKo') && hasKey(place, 'category');
