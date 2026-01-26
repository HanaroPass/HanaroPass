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
