export type CardData = {
  id: number;
  type: string;
  name: string;
  balance: string;
  imageUrl: string;
  color: string;
  cardNumber: string;
};

export const MOCK_CARDS: CardData[] = [
  {
    id: 1,
    type: 'Hana Card Check',
    name: 'HANA THE EASY',
    balance: '500,266',
    imageUrl: '/images/main/ezcard.png',
    color: 'bg-green-ez',
    cardNumber: '1234 5678 9012 3456',
  },
  {
    id: 2,
    type: 'Hana Card Credit',
    name: 'HANA VIVA G',
    balance: '1,250,000',
    imageUrl: '/images/main/ezcard.png',
    color: 'bg-sky-700',
    cardNumber: '1577 5678 9012 1200',
  },
];
