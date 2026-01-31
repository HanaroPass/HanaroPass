'use server';

import { prisma } from '@/lib/prisma';
import { getUserIdFromSession } from '@/lib/session';
import { type IdentityData, IdentityDataSchema } from './identity.schema';

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function getIdentityData(): Promise<IdentityData> {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) return { passport: null, arc: null };

    const [passport, arc, user] = await Promise.all([
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
      prisma.user.findUnique({
        where: { id: userId },
        select: { nationality: true },
      }),
    ]);

    const res = {
      passport: passport
        ? {
            passportNumber: passport.passportNumber,
            gender: passport.gender,
            issueDate: toISODate(passport.issueDate),
            expiryDate: toISODate(passport.expiryDate),
            userPhotoUrl: passport.userPhotoUrl ?? '',
            nationality: user?.nationality ?? '',
          }
        : null,

      arc: arc
        ? {
            arcNumber: arc.arcNumber,
            residenceStatus: arc.residenceStatus,
            issueDate: toISODate(arc.issueDate),
            userPhotoUrl: arc.userPhotoUrl ?? '',
            nationality: user?.nationality ?? '',
          }
        : null,
    };

    const validation = IdentityDataSchema.safeParse(res);

    if (!validation.success) {
      return { passport: null, arc: null };
    }

    return validation.data;
  } catch {
    return { passport: null, arc: null };
  }
}
