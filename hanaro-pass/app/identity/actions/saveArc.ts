'use server';

import type { z } from 'zod';
import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { createDefaultSavedPlaces } from '@/lib/savedPlaces';
import { getUserIdFromSession, saveUserIdToSession } from '@/lib/session';
import { ArcFormSchema } from './identity.schema';

type ArcFormValues = z.infer<typeof ArcFormSchema>;
type ArcActionData = ArcFormValues & {
  registrationNumber: string;
  registrationNumberSuffix: string;
};

const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
};

export async function saveArcData(
  _prevState: ActionResult<ArcActionData> | null,
  formData: FormData,
): Promise<ActionResult<ArcActionData>> {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const regNum = String(rawData.registrationNumber ?? '');
    const regSuffix = String(rawData.registrationNumberSuffix ?? '');
    const arcNumber = regNum && regSuffix ? `${regNum}-${regSuffix}` : '';

    const validated = ArcFormSchema.parse({
      ...rawData,
      arcNumber,
    });

    const {
      lastName,
      firstName,
      nationality,
      residenceStatus,
      issueDate,
      userPhotoUrl,
    } = validated;

    const nickname = `${lastName} ${firstName}`.trim();
    const sessionUserId = await getUserIdFromSession();

    const result = await prisma.$transaction(async (tx) => {
      const existingArc = await tx.aRC.findUnique({
        where: { arcNumber: validated.arcNumber },
        select: { id: true, userId: true },
      });

      if (existingArc) {
        if (sessionUserId && existingArc.userId !== sessionUserId) {
          throw new HttpError('이미 다른 계정에 등록된 ARC 번호입니다.', 409);
        }
        return existingArc;
      }

      let userIdToUse = sessionUserId;

      if (!userIdToUse) {
        const user = await tx.user.create({
          data: { nickname, nationality },
          select: { id: true },
        });
        userIdToUse = user.id;

        await createDefaultSavedPlaces(tx, userIdToUse);
      }

      return await tx.aRC.create({
        data: {
          userId: userIdToUse,
          arcNumber: validated.arcNumber,
          residenceStatus,
          issueDate: parseLocalDate(issueDate),
          userPhotoUrl,
        },
        select: { id: true, userId: true },
      });
    });

    await saveUserIdToSession(result.userId);

    return {
      success: true,
      data: {
        ...validated,
        registrationNumber: regNum,
        registrationNumberSuffix: regSuffix,
      },
    };
  } catch (error) {
    return handleActionResult(error);
  }
}
