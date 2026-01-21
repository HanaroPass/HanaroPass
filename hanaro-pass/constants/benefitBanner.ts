export const BENEFIT_BANNER_VARIANTS = {
  SKI: 'ski',
  ICE_FESTIVAL: 'ice_festival',
  WINTER_CAMPING: 'winter_camping',
  HOT_SPRING: 'hot_spring',
} as const;

export type BenefitBannerVariant =
  (typeof BENEFIT_BANNER_VARIANTS)[keyof typeof BENEFIT_BANNER_VARIANTS];

export const BENEFIT_BANNER_COPY: Record<
  BenefitBannerVariant,
  {
    badge?: string;
    subtitle: string;
    cta: string;
    imageSrc: string;
    imageAlt: string;
    tone: 'light' | 'dark';
    textAlign: 'text-left' | 'text-right' | 'text-center';
    contentPos: { top: string; left?: string; right?: string };
    ctaPos: { bottom: string; left?: string; right?: string };
  }
> = {
  ski: {
    badge: '특별 혜택',
    subtitle: '신나는 스키 여행 떠나요!',
    cta: '자세히 보기',
    imageSrc: '/images/banners/banner-ski.png',
    imageAlt: 'Ski benefit banner',
    textAlign: 'text-left',
    contentPos: { top: '70px', left: '12px' },
    ctaPos: { bottom: '12px', left: '12px' },
    tone: 'dark',
  },
  ice_festival: {
    subtitle: '겨울 축제 즐겨봐요!',
    cta: '자세히 보기',
    imageSrc: '/images/banners/banner-ice-festival.png',
    imageAlt: 'Ice festival benefit banner',
    textAlign: 'text-right',
    contentPos: { top: '38px', left: '170px' },
    ctaPos: { bottom: '20px', left: '285px' },
    tone: 'dark',
  },
  winter_camping: {
    subtitle: '겨울 캠핑 어떠신가요?',
    cta: '자세히 보기',
    imageSrc: '/images/banners/banner-winter-camping.png',
    imageAlt: 'Winter camping benefit banner',
    textAlign: 'text-center',
    contentPos: { top: '20px', left: '80px' },
    ctaPos: { bottom: '60px', left: '150px' },
    tone: 'dark',
  },
  hot_spring: {
    subtitle: '신나는 온천 여행으로!',
    cta: '자세히 보기',
    imageSrc: '/images/banners/banner-hot-spring.png',
    imageAlt: 'Hot spring benefit banner',
    textAlign: 'text-left',
    contentPos: { top: '20px', left: '10px' },
    ctaPos: { bottom: '60px', left: '10px' },
    tone: 'dark',
  },
};

// TODO: 국가 코드 맞추기
export const COUNTRY_LABEL: Record<string, string> = {
  HK: '홍콩',
  TH: '태국',
  TW: '대만',
  RU: '러시아',
};
