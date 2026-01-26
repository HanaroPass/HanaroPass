'use server';

import { prisma } from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/session';

// 서류 보유 상태 가져오기
export async function getDocsStatus() {
  const userId = await getUserIdFromSession();
  if (!userId) return null;

  const [passport, arc, docs] = await Promise.all([
    prisma.passport.findUnique({ where: { userId }, select: { id: true } }),
    prisma.aRC.findUnique({ where: { userId }, select: { id: true } }),
    prisma.userDocument.findMany({
      where: { userId },
      select: { docType: true },
    }),
  ]);

  const docTypes = new Set(docs.map((d) => d.docType));

  return {
    userId,
    hasPassport: !!passport,
    hasARC: !!arc,
    hasDocType: {
      STUDENT_ID: docTypes.has('STUDENT_ID'),
      COPY: docTypes.has('COPY'),
      PHOTO: docTypes.has('PHOTO'),
    },
  };
}
