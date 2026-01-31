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
import { PassportFormSchema } from './identity.schema';

type PassportFormValues = z.infer<typeof PassportFormSchema>;

const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
};

export async function savePassportData(
  _prevState: ActionResult<PassportFormValues> | null,
  formData: FormData,
): Promise<ActionResult<PassportFormValues>> {
  try {
    const validated = PassportFormSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    const { lastName, firstName, expiryDate, issueDate } = validated;
    const nickname = `${lastName} ${firstName}`.trim();
    const expiryDateObj = parseLocalDate(expiryDate);

    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);
    if (expiryDateObj <= todayUTC) {
      throw new HttpError('만료된 여권은 등록할 수 없습니다.', 400);
    }

    const sessionUserId = await getUserIdFromSession();

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.passport.findUnique({
        where: { passportNumber: validated.passportNumber },
      });

      if (existing) {
        if (!sessionUserId) {
          throw new HttpError(
            '이미 등록된 여권번호입니다. 로그인 후 시도해주세요.',
            409,
          );
        }
        if (existing.userId !== sessionUserId) {
          throw new HttpError('이미 다른 계정에 등록된 여권번호입니다.', 409);
        }
        return existing;
      }

      let userIdToUse = sessionUserId ?? null;

      if (!userIdToUse) {
        const user = await tx.user.create({
          data: { nickname, nationality: validated.nationality },
        });
        userIdToUse = user.id;

        await createDefaultSavedPlaces(tx, userIdToUse);
      }

      return await tx.passport.create({
        data: {
          userId: userIdToUse,
          passportNumber: validated.passportNumber,
          gender: validated.gender as 'MALE' | 'FEMALE' | 'OTHERS',
          issueDate: parseLocalDate(issueDate),
          expiryDate: expiryDateObj,
          userPhotoUrl: validated.userPhotoUrl,
        },
      });
    });

    await saveUserIdToSession(result.userId);

    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    console.log(error);
    return handleActionResult(error);
  }
}
