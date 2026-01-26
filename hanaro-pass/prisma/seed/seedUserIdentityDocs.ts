import { prisma } from '@/lib/prisma';

export async function seedUserIdentityDocs() {
  console.log('[ Passport / ARC 유저별 더미 생성 중... ]');

  const users = await prisma.user.findMany({ select: { id: true } });

  if (users.length === 0) {
    console.warn('User가 없어 시드를 건너뜁니다.');
    return;
  }

  for (const { id: userId } of users) {
    // Passport (userId unique 기준 upsert)
    await prisma.passport.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        passportNumber: `P-${userId}`,
        gender: 'MALE',
        issueDate: new Date('2022-01-01'),
        expiryDate: new Date('2032-01-01'),
        userPhotoUrl: 'https://example.com/passport-photo.jpg',
      },
    });

    // ARC (userId unique 기준 upsert)
    await prisma.aRC.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        arcNumber: `ARC-${userId}`,
        residenceStatus: 'D-2',
        issueDate: new Date('2023-03-01'),
        userPhotoUrl: 'https://example.com/arc-photo.jpg',
      },
    });
  }

  console.log(`[ 완료 ] ${users.length}명 Passport/ARC 생성(또는 유지) 완료`);
}
