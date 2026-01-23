import type { LocationInfo } from '../components/ui/PlaceCard';

export type Embassy = {
  id: number;
  nationality: string;
  placeName: string;
  address: string;
  openHours: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export const MAP_EMBASSY_MOCK: Embassy = {
  id: 101,
  nationality: 'Japan',
  placeName: '주대한민국일본국대사관',
  address: '서울특별시 종로구 율곡로 6 트윈트리타워 A동',
  openHours: '09:30 - 17:00 (주말 휴무)',
  phone: '02-2170-5200',
  latitude: 37.5751,
  longitude: 126.9801,
};

export const MAP_EXCHANGE_MOCK: LocationInfo[] = [
  {
    id: 1,
    name: '투어시티환전소',
    type: '환전소',
    status: '영업 중',
    explainTime: '17:30에 영업 종료',
    distance: '3.9km',
    address: '서울 강남구 삼성동',
    phone: '0507-1419-0097',
  },
  {
    id: 2,
    name: '머니박스 강남역지점',
    type: '환전소',
    status: '영업 중',
    explainTime: '22:00에 영업 종료',
    distance: '5.8km',
    address: '서울 서초구 서초동',
    phone: '02-3478-8388',
  },
  {
    id: 3,
    name: '머니박스 강남역지점',
    type: '환전소',
    status: '영업 중',
    explainTime: '22:00에 영업 종료',
    distance: '5.8km',
    address: '서울 서초구 서초동',
    phone: '02-3478-8388',
  },
  {
    id: 4,
    name: '머니박스 강남역지점',
    type: '환전소',
    status: '영업 중',
    explainTime: '22:00에 영업 종료',
    distance: '5.8km',
    address: '서울 서초구 서초동',
    phone: '02-3478-8388',
  },
  {
    id: 5,
    name: '투어시티환전소투어시티환전소투어시티환전소',
    type: '환전소',
    status: '영업 중',
    explainTime: '17:30에 영업 종료',
    distance: '3.9km',
    address: '서울 강남구 삼성동',
    phone: '0507-1419-0097',
  },
];
