'use server';

import { prisma } from '@/lib/prisma';
import { savePassportToSession } from '@/lib/session';
import {
  handleActionResult,
  HttpError,
  type ActionResult,
} from '@/lib/error-handler';

export async function savePassportData(
  data: Record<string, string>,
): Promise<ActionResult<{ id: number }>> {
  try {
    const {
      passportNumber,
      gender,
      issueDate,
      expiryDate,
      lastName,
      firstName,
      userPhotoUrl,
      nationality,
    } = data;

    if (
      !passportNumber ||
      !gender ||
      !issueDate ||
      !expiryDate ||
      !lastName ||
      !firstName ||
      !nationality
    ) {
      throw new HttpError('모든 정보를 정확히 입력해주세요.', 400);
    }

    const nickname = `${lastName} ${firstName}`.trim();

    const result = await prisma.$transaction(async (tx) => {
      // 기존에 동일한 여권번호를 가진 정보가 있는지 먼저 확인
      const existingPassport = await tx.passport.findUnique({
        where: { passportNumber },
        select: { id: true, userId: true },
      });

      if (existingPassport) {
        // 이미 여권이 등록된 유저라면 추가 생성 없이 기존 ID 반환
        return existingPassport;
      }

      // 여권이 없다면, 유저 생성
      const user = await tx.user.create({
        data: {
          nickname,
          nationality,
        },
      });

      return await tx.passport.create({
        data: {
          userId: user.id,
          passportNumber,
          gender: gender as 'MALE' | 'FEMALE' | 'OTHERS',
          issueDate: new Date(issueDate),
          expiryDate: new Date(expiryDate),
          userPhotoUrl: userPhotoUrl || '',
        },
        select: { id: true },
      });
    });

    // 세션 저장
    await savePassportToSession(passportNumber);

    return {
      success: true,
      data: { id: result.id },
    };
  } catch (error: unknown) {
    return handleActionResult(error);
  }
}
