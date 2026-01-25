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

    // 유저와 여권 레코드 생성
    const result = await prisma.$transaction(async (tx) => {
      // 신규 유저 생성
      const newUser = await tx.user.create({
        data: {
          nickname,
          nationality,
        },
      });

      // 해당 유저의 여권 정보 생성
      return await tx.passport.create({
        data: {
          userId: newUser.id,
          passportNumber,
          gender: gender as 'MALE' | 'FEMALE' | 'OTHERS',
          issueDate: new Date(issueDate),
          expiryDate: new Date(expiryDate),
          userPhotoUrl: userPhotoUrl || '',
        },
        select: { id: true },
      });
    });

    // 세션 생성 ( 여권번호 암호화 )
    await savePassportToSession(passportNumber);

    return {
      success: true,
      data: { id: result.id },
    };
  } catch (error: unknown) {
    // 중복된 여권번호 등에 대한 DB 에러 처리
    return handleActionResult(error);
  }
}
