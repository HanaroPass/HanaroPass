'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { getUserIdFromSession, saveUserIdToSession } from '@/lib/session';
import { PassportFormSchema } from './identity.schema';

const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
};

export async function savePassportData(
  _prevState: ActionResult<Record<string, string>> | null,
  formData: FormData,
): Promise<ActionResult<Record<string, string>>> {
  try {
    const validated = PassportFormSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    const { lastName, firstName } = validated;
    const nickname = `${lastName} ${firstName}`.trim();
    const expiryDateObj = parseLocalDate(validated.expiryDate);

    if (expiryDateObj <= new Date()) {
      throw new HttpError('만료된 여권은 등록할 수 없습니다.', 400);
    }

    const sessionUserId = await getUserIdFromSession();

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.passport.findUnique({
        where: { passportNumber: validated.passportNumber },
      });

      if (existing && sessionUserId && existing.userId !== sessionUserId) {
        throw new HttpError('이미 다른 계정에 등록된 여권번호입니다.', 409);
      }

      let userIdToUse = sessionUserId ?? null;

      if (!userIdToUse) {
        const user = await tx.user.create({
          data: { nickname, nationality: validated.nationality },
        });
        userIdToUse = user.id;
      }

      return await tx.passport.create({
        data: {
          userId: userIdToUse,
          passportNumber: validated.passportNumber,
          gender: validated.gender as 'MALE' | 'FEMALE' | 'OTHERS',
          issueDate: parseLocalDate(validated.issueDate),
          expiryDate: expiryDateObj,
          userPhotoUrl: validated.userPhotoUrl,
        },
      });
    });
    await saveUserIdToSession(result.userId);
    return { success: true, data: { ...validated } };
  } catch (error) {
    return handleActionResult(error);
  }
}
