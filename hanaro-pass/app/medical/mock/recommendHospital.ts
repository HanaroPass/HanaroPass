import { HospitalInfo } from '@/app/map/components/hospital/HospitalCard';

export const hospitalLocations: HospitalInfo[] = [
  {
    name: '어쩌구 바른 내과',
    cardLanguage: '영어, 일본어',
    cardDepartment: '내과',

    status: '진료 중',
    openTime: '09:00',
    closeTime: '18:00',

    address: '서울 광진구 자양동',
    phone: '02-1234-5678',

    languages: ['영어', '일본어'],
    departments: ['내과'],

    latitude: '37.546410',
    longitude: '127.053347',
  },
  {
    name: '강남 정형외과 의원',
    cardLanguage: '영어',
    cardDepartment: '정형외과',

    status: '진료 중',
    openTime: '10:00',
    closeTime: '19:30',

    address: '서울 강남구 논현동',
    phone: '02-9876-4321',

    languages: ['영어'],
    departments: ['정형외과'],

    latitude: '37.546470',
    longitude: '127.563347',
  },
  {
    name: '성동 글로벌 피부과',
    cardLanguage: '영어',
    cardDepartment: '피부과',

    status: '진료 중',
    openTime: '10:30',
    closeTime: '20:00',

    address: '서울 성동구 성수동',
    phone: '02-2222-3333',

    languages: ['영어', '중국어'],
    departments: ['피부과'],

    latitude: '37.546411',
    longitude: '127.053247',
  },
  {
    name: '광진 국제 치과',
    cardLanguage: '영어, 일본어',
    cardDepartment: '치과',

    status: '진료 종료',
    openTime: '09:30',
    closeTime: '17:00',

    address: '서울 광진구 화양동',
    phone: '02-5555-6666',

    languages: ['영어', '일본어', '중국어'],
    departments: ['치과'],

    latitude: '37.482671',
    longitude: '127.009591',
  },
];
