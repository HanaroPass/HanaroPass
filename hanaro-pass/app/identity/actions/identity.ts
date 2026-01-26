'use server';

import { prisma } from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/session';

export type IdentityPayload =
  | { type: 'passport'; data: Record<string, string> }
  | { type: 'alien'; data: Record<string, string> }
  | { type: null; data: null };

// 신분증 or 여권 보유
export async function getIdentityData(): Promise<{
  passport: Record<string, string> | null;
  alien: Record<string, string> | null;
}> {
  const userId = await getUserIdFromSession();
  if (!userId) return { passport: null, alien: null };

  const [passport, arc] = await Promise.all([
    prisma.passport.findUnique({
      where: { userId },
      select: {
        passportNumber: true,
        gender: true,
        issueDate: true,
        expiryDate: true,
        userPhotoUrl: true,
      },
    }),
    prisma.aRC.findUnique({
      where: { userId },
      select: {
        arcNumber: true,
        residenceStatus: true,
        issueDate: true,
        userPhotoUrl: true,
      },
    }),
  ]);

  const toDateString = (d: Date) => d.toISOString().slice(0, 10);

  return {
    passport: passport
      ? {
          passportNumber: passport.passportNumber,
          gender: passport.gender,
          issueDate: toDateString(passport.issueDate),
          expiryDate: toDateString(passport.expiryDate),
          userPhotoUrl: passport.userPhotoUrl ?? '',
        }
      : null,

    alien: arc
      ? {
          arcNumber: arc.arcNumber,
          residenceStatus: arc.residenceStatus,
          issuedDate: toDateString(arc.issueDate),
          userPhotoUrl: arc.userPhotoUrl ?? '',
        }
      : null,
  };
}
