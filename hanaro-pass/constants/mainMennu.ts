export type MainPageKey = 'pay' | 'transfer' | 'service';

export type MenuItem = {
  label: string;
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
