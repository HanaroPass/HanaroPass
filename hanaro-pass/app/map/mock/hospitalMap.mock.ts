export type HospitalPlace = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  address: string;
  phone: string;
  openHours: string;
  departments: string[];
  languages: string[];
};

export const HOSPITALS_MAP_MOCK: HospitalPlace[] = [
  {
    id: 1,
    name: '회복재한의원',
    latitude: '37.5463505',
    longitude: '127.0490136',
    address: '서울 성동구 성수동1가 14-35',
    phone: '0507-1339-4124',
    openHours: '09:30-18:30',
    departments: ['한의원'],
    languages: ['한국어'],
  },
  {
    id: 2,
    name: '아이리스피부과의원 성수',
    latitude: '37.546305',
    longitude: '127.0490765',
    address: '서울 성동구 성수동2가 301-96',
    phone: '02-465-0119',
    openHours: '09:00-18:00',
    departments: ['피부과'],
    languages: ['한국어', '영어'],
  },
  {
    id: 3,
    name: '힘내라내과의원',
    latitude: '37.54476945718184',
    longitude: '127.05702557610272',
    address: '서울 성동구 성수동2가 300-1',
    phone: '02-465-0119',
    openHours: '09:00-18:00',
    departments: ['내과'],
    languages: ['한국어', '중국어'],
  },
  {
    id: 4,
    name: '성수탑내과의원',
    latitude: '37.54473922591064',
    longitude: '127.0542588606223',
    address: '서울 성동구 성수동2가 314-5',
    phone: '02-465-0119',
    openHours: '09:00-18:00',
    departments: ['내과'],
    languages: ['한국어', '영어'],
  },
  {
    id: 5,
    name: '메이린의원 성수',
    latitude: '37.54531672841188',
    longitude: '127.05234690847941',
    address: '서울 성동구 성수동2가 302-44',
    phone: '02-465-0119',
    openHours: '09:00-18:00',
    departments: ['피부과'],
    languages: ['한국어', '영어', '일본어'],
  },
];
