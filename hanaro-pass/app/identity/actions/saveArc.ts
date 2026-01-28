'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { getUserIdFromSession, saveUserIdToSession } from '@/lib/session';
import { ArcFormSchema } from './identity.schema'; // 스키마 임포트 확인

const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
};

export async function saveArcData(
  _prevState: ActionResult<Record<string, string>> | null,
  formData: FormData,
): Promise<ActionResult<Record<string, string>>> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const arcNumber =
      rawData.registrationNumber && rawData.registrationNumberSuffix
        ? `${rawData.registrationNumber}-${rawData.registrationNumberSuffix}`
        : '';

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

      let userIdToUse = sessionUserId ?? null;

      if (!userIdToUse) {
        const user = await tx.user.create({
          data: { nickname, nationality },
          select: { id: true },
        });
        userIdToUse = user.id;
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
        registrationNumber: rawData.registrationNumber as string,
        registrationNumberSuffix: rawData.registrationNumberSuffix as string,
      },
    };
  } catch (error) {
    return handleActionResult(error);
  }
}
