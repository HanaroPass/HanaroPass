export type CardData = {
  id: string;
  type: string;
  name: string;
  balance: string;
  imageUrl: string;
  color: string;
};

export const MOCK_CARDS: CardData[] = [
  {
    id: 'card-1',
    type: 'Hana Card Check',
    name: 'HANA THE EASY',
    balance: '500,266',
    imageUrl: '/images/main/ezcard.png',
    color: 'bg-green-ez',
  },
  {
    id: 'card-2',
    type: 'Hana Card Credit',
    name: 'HANA VIVA G',
    balance: '1,250,000',
    imageUrl: '/images/main/card_viva.png',
    color: 'bg-sky-700',
  },
];
