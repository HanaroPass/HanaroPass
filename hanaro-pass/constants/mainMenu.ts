export type MainPageKey = 'pay' | 'transfer' | 'service';

export type MenuItem = {
  label: string;
  icon: string;
  link: string;
};

export type PrimaryMenuItem = {
  title: string;
  description?: string;
  icon: string;
  link: string;
};

export const MAIN_MENUS: Record<MainPageKey, MenuItem[]> = {
  pay: [
    {
      label: '하나 EZ 카드 등록하기',
      icon: '/images/main/card.svg',
      link: '',
    },
    {
      label: '쿠폰 zone',
      icon: '/images/main/coupon.svg',
      link: '',
    },
  ],

  transfer: [
    {
      label: 'Hana EZ에서 계좌개설해요',
      icon: '/images/main/open-account.svg',
      link: '',
    },
    {
      label: '다른 은행 계좌 연결하기',
      icon: '/images/main/bank-link.svg',
      link: '',
    },
  ],

  service: [
    {
      label: '번호표/은행방문 예약',
      icon: '/images/main/reservation.svg',
      link: '',
    },
    {
      label: '가까운 지점 찾기',
      icon: '/images/main/location.svg',
      link: '',
    },
  ],
};

export const PRIMARY_MENUS: Record<MainPageKey, PrimaryMenuItem[]> = {
  pay: [],

  transfer: [],

  service: [
    {
      title: '모바일 신분증',
      description: '여권·외국인등록증을 조회해요',
      icon: '/images/main/mobile-id.svg',
      link: '',
    },
    {
      title: 'K-Map 안내',
      description: '맞춤형 병원/대사관/환전소\n정보를 한눈에 보여줘요',
      icon: '/images/main/k-map.svg',
      link: '',
    },
    {
      title: '다국어 전화 안내',
      icon: '/images/main/multilang.svg',
      link: '',
    },
    {
      title: '서류 보관함',
      icon: '/images/main/documents.svg',
      link: '',
    },
  ],
};
