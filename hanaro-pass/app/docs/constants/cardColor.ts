export type CardColor = 'blueStrong' | 'blueSoft' | 'purple' | 'gray' | 'peach';

export const CARD_GRADIENT_CLASS: Record<CardColor, string> = {
  blueStrong: 'bg-gradient-to-b from-[#3395C9] to-[#82BEDE]',
  blueSoft: 'bg-gradient-to-b from-[#55B4ED] to-[#8BCCF3]',
  purple: 'bg-gradient-to-b from-[#937DCE] to-[#B7A8DE]',
  gray: 'bg-gradient-to-b from-[#A2ABC5] to-[#CDD2E0]',
  peach: 'bg-gradient-to-b from-[#FBC5B9] to-[#FDE9E5]',
};
