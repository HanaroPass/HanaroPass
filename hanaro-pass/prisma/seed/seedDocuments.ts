import { prisma } from '@/lib/prisma';

/**
 * UserDocument 더미 데이터 생성
 */
export async function seedUserDocs() {
  console.log('[ UserDocument 더미 생성 중... ]');

  const user = await prisma.user.findFirst();
  if (!user) {
    console.warn('User가 없어 문서 시드를 건너뜁니다.');
    return;
  }
  const userId = user.id;

  // UserDocument 있으면 건너뛰기
  const existingDocTypes = await prisma.userDocument.findMany({
    where: { userId },
    select: { docType: true },
  });

  const has = new Set(existingDocTypes.map((d) => d.docType));

  const docsToCreate = [
    { docType: 'PHOTO' as const, fileUrl: 'https://example.com/photo.jpg' },
    {
      docType: 'COPY' as const,
      fileUrl: 'https://example.com/passport-copy.pdf',
    },
    {
      docType: 'STUDENT_ID' as const,
      fileUrl: 'https://example.com/student-id.jpg',
    },
  ].filter((d) => !has.has(d.docType));

  if (docsToCreate.length > 0) {
    await prisma.userDocument.createMany({
      data: docsToCreate.map((d) => ({ userId, ...d })),
    });
  }

  console.log('[ 완료 ] UserDocument 더미 생성 완료');
}
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
