'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/user';
import {
  handleActionResult,
  HttpError,
  type ActionResult,
} from '@/lib/error-handler';

export const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export async function saveArcData(
  data: Record<string, string>,
): Promise<ActionResult<{ id: number }>> {
  try {
    // 유저 세션에서 userId 가져오기
    const userId = await getUserId();
    if (!userId) {
      throw new HttpError(
        '인증 정보가 없습니다. 여권 등록을 먼저 진행해주세요.',
        401,
      );
    }

    const {
      registrationNumber,
      registrationNumberSuffix,
      residenceStatus,
      issuedDate,
      userPhotoUrl = '',
    } = data;
    const arcNumber =
      registrationNumber && registrationNumberSuffix
        ? `${registrationNumber}-${registrationNumberSuffix}`
        : '';

    if (!userId) throw new HttpError('인증 세션이 없습니다.', 401);
    if (!arcNumber || arcNumber.length < 14) {
      throw new HttpError('외국인 등록번호를 올바르게 입력해주세요.', 400);
    }
    if (!residenceStatus)
      throw new HttpError('체류 자격 정보가 누락되었습니다.', 400);
    if (!issuedDate) throw new HttpError('발급 일자가 누락되었습니다.', 400);

    const parseLocalDate = (dateStr: string) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      return new Date(y, m - 1, d);
    };

    const result = await prisma.aRC.upsert({
      where: { userId },
      update: {
        arcNumber,
        residenceStatus,
        issueDate: parseLocalDate(issuedDate),
        userPhotoUrl,
      },
      create: {
        userId,
        arcNumber,
        residenceStatus,
        issueDate: parseLocalDate(issuedDate),
        userPhotoUrl,
      },
      select: { id: true },
    });

    return { success: true, data: { id: result.id } };
  } catch (error) {
    return handleActionResult(error);
  }
}
