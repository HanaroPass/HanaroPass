import { CardType } from '@/lib/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function seedUserCards() {
  console.log('[ UserCard 더미 생성 중... ]');

  const user = await prisma.user.findFirst({
    orderBy: { id: 'asc' },
    select: { id: true },
  });

  if (!user) {
    console.warn('User가 없어 UserCard 시드를 건너뜁니다.');
    return;
  }

  const exists = await prisma.userCard.findFirst({
    where: { userId: user.id },
    select: { id: true },
  });

  if (exists) {
    console.log('[ UserCard 이미 존재 - 스킵 ]');
    return;
  }

  await prisma.userCard.createMany({
    data: [
      {
        userId: user.id,
        cardType: CardType.HANA_EZ,
        cardNumber: '1111222233334444',
        balance: '500266.00',
        isDefault: true,
      },
      {
        userId: user.id,
        cardType: CardType.PREPAID_TRAVELER,
        cardNumber: '5555666677778888',
        balance: '12000.00',
        isDefault: false,
      },
    ],
  });

  console.log('[ UserCard 더미 생성 완료 ]');
}
