import type { Embassy } from '@/lib/generated/prisma';

export const EMBASSY_DATA: Omit<Embassy, 'id'>[] = [
  {
    nationality: 'UNITED STATES OF AMERICA', // USA
    placeName: '주한 미국 대사관',
    address: '서울 종로구 세종대로 188 미국대사관',
    openHours: '08:30-17:00',
    phone: '02-397-4114',
    latitude: '37.5731389',
    longitude: '126.9778709',
  },
  {
    nationality: "PEOPLE'S REPUBLIC OF CHINA", // China
    placeName: '주한 중국 대사관',
    address: '서울 중구 명동2길 27',
    openHours: '09:00-17:30',
    phone: '02-756-7300',
    latitude: '37.5630446873577',
    longitude: '126.982987298367',
  },
  {
    nationality: 'REPUBLIC OF JAPAN', // Japan
    placeName: '주한 일본 대사관',
    address: '서울 종로구 율곡로 6 트윈트리타워 A동',
    openHours: `대사관 09:00-18:00, 12:00-13:15 점심시간 \n영사과 09:00-17:00, 12:00-13:30 민원창구 휴게시간`,
    phone: '02-2170-5200',
    latitude: '37.5754945',
    longitude: '126.9804019',
  },

  {
    nationality: 'SOCIALIST REPUBLIC OF VIET NAM', // Vietnam
    placeName: '주한 베트남 대사관',
    address: '서울 종로구 북촌로 123 주한베트남대사관',
    openHours: '09:30-17:00, 12:00-14:30 휴게시간',
    phone: '02-739-9399',
    latitude: '37.5865224',
    longitude: '126.9840885',
  },
  {
    nationality: 'KINGDOM OF THAILAND', // Thailand
    placeName: '주한 태국 대사관',
    address: '서울 용산구 대사관로 42 태국대사관',
    openHours: '09:00-15:00, 12:00-13:00 휴게시간',
    phone: '02-790-2955',
    latitude: '37.5333906763007',
    longitude: '127.002842077327',
  },
  {
    nationality: 'REPUBLIC OF THE PHILIPPINES', // Philippines
    placeName: '주한 필리핀 대사관',
    address: '서울 용산구 회나무로 80',
    openHours: '10:00-15:00',
    phone: '02-796-7387',
    latitude: '37.5413',
    longitude: '126.9967',
  },
  {
    nationality: 'REPUBLIC OF INDONESIA', // Indonesia
    placeName: '주한 인도네시아 대사관',
    address: '서울 영등포구 여의대방로 380 인도네시아대사관',
    openHours: '09:00-16:00, 12:30-13:30 휴게시간',
    phone: '02-783-5675',
    latitude: '37.5185014',
    longitude: '126.9315844',
  },
  {
    nationality: 'KINGDOM OF CAMBODIA', // Cambodia
    placeName: '주한 캄보디아 대사관',
    address: '서울 중구 세종대로 55 부영태평빌딩 14층',
    openHours: '09:00-17:00',
    phone: '02-3785-1041',
    latitude: '37.5616192365957',
    longitude: '126.974978475659',
  },
  {
    nationality: 'REPUBLIC OF THE UNION OF MYANMAR', // Myanmar
    placeName: '주한 미얀마 대사관',
    address: '서울 용산구 한남대로28길 12',
    openHours: '09:30-17:00, 12:30-13:30 휴게시간',
    phone: '02-790-3814',
    latitude: '37.53823293046',
    longitude: '127.005277531228',
  },
  {
    nationality: 'REPUBLIC OF MONGOLIA', // Mongolia
    placeName: '주한 몽골 대사관',
    address: '서울 용산구 독서당로 95 몽골대사관',
    openHours: '09:00-18:00, 12:30-13:30 휴게시간',
    phone: '02-798-3464',
    latitude: '37.5351497',
    longitude: '127.010729',
  },
  {
    nationality: 'RUSSIAN FEDERATION', // Russia
    placeName: '주한 러시아 대사관',
    address: '서울 중구 서소문로11길 43 주한러시아대사관',
    openHours: '09:00-18:00, 12:30-14:00 점심시간',
    phone: '02-318-2116',
    latitude: '37.5649804',
    longitude: '126.9718695',
  },
  {
    nationality: "PEOPLE'S REPUBLIC OF BANGLADESH", // Bangladesh
    placeName: '주한 방글라데시 대사관',
    address: '서울 용산구 장문로6길 17',
    openHours: '09:00-17:00',
    phone: '02-796-4056',
    latitude: '37.5284',
    longitude: '126.9965',
  },
  {
    nationality: 'DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA', // Sri Lanka
    placeName: '주한 스리랑카 대사관',
    address: '서울 중구 동호로10길 39 장호물산',
    openHours: '9:30-16:30, 12:00-14:30 휴게시간',
    phone: '02-735-2966',
    latitude: '37.555582',
    longitude: '127.0122579',
  },
  {
    nationality: 'REPUBLIC OF NEPAL', // Nepal
    placeName: '주한 네팔 대사관',
    address: '서울 성북구 선잠로2길 19 주한네팔대사관',
    openHours: '09:30-14:00, 12:00-13:00 휴게시간',
    phone: '02-3789-9770',
    latitude: '37.5954184',
    longitude: '126.9990905',
  },
  {
    nationality: 'REPUBLIC OF UZBEKISTAN', // Uzbekistan
    placeName: '주한 우즈베키스탄 대사관',
    address: '서울 종로구 돈화문로11가길 99',
    openHours: '09:00-18:00, 12:30-14:00 휴게시간',
    phone: '02-574-6554',
    latitude: '37.5769327',
    longitude: '126.9897599',
  },
];
