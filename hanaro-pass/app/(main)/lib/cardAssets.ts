import type { CardType } from '@/lib/generated/prisma';

const CARD_IMAGE_BY_TYPE: Record<CardType, string> = {
  HANA_EZ: '/images/main/HANA_EZ.png',
  PREPAID_TRAVELER: '/images/main/PREPAID_TRAVELER.png',
};

export function getCardImageUrl(cardType: CardType) {
  return CARD_IMAGE_BY_TYPE[cardType];
}
