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
