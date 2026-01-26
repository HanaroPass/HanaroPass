'use server';

import { prisma } from '@/lib/prisma';
import {
  handleActionResult,
  HttpError,
  type ActionResult,
} from '@/lib/error-handler';
import { getUserIdFromSession, saveUserIdToSession } from '@/lib/session';

const parseLocalDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export async function saveArcData(
  data: Record<string, string>,
): Promise<ActionResult<{ id: number; userId: number }>> {
  try {
    const sessionUserId = await getUserIdFromSession();

    const {
      registrationNumber,
      registrationNumberSuffix,
      residenceStatus,
      issuedDate,
      userPhotoUrl = '',
      lastName,
      firstName,
      nationality,
    } = data;

    const arcNumber =
      registrationNumber && registrationNumberSuffix
        ? `${registrationNumber}-${registrationNumberSuffix}`
        : '';

    if (!arcNumber || arcNumber.length < 14) {
      throw new HttpError('외국인 등록번호를 올바르게 입력해주세요.', 400);
    }
    if (!residenceStatus) {
      throw new HttpError('체류 자격 정보가 누락되었습니다.', 400);
    }
    if (!issuedDate) {
      throw new HttpError('발급 일자가 누락되었습니다.', 400);
    }

    const nickname =
      lastName && firstName ? `${lastName} ${firstName}`.trim() : '';

    const result = await prisma.$transaction(async (tx) => {
      // 기존에 동일한 신분증 번호를 가진 정보가 있는지 먼저 확인
      const existingArc = await tx.aRC.findUnique({
        where: { arcNumber },
        select: { id: true, userId: true },
      });

      if (existingArc) {
        // 로그인 상태인데 다른 사람 신분증이면 막기
        if (sessionUserId && existingArc.userId !== sessionUserId) {
          throw new HttpError('이미 다른 계정에 등록된 ARC 번호입니다.', 409);
        }
        return existingArc;
      }

      // 신분증 번호가 신규라면: 로그인 상태면 그 userId로 연결, 아니면 user 생성
      let userIdToUse = sessionUserId ?? null;

      if (!userIdToUse) {
        if (!nickname || !nationality) {
          throw new HttpError('사용자 정보가 누락되었습니다.', 400);
        }
        const user = await tx.user.create({
          data: { nickname, nationality },
          select: { id: true },
        });
        userIdToUse = user.id;
      }

      const created = await tx.aRC.create({
        data: {
          userId: userIdToUse,
          arcNumber,
          residenceStatus,
          issueDate: parseLocalDate(issuedDate),
          userPhotoUrl,
        },
        select: { id: true, userId: true },
      });

      return created;
    });

    await saveUserIdToSession(result.userId);

    return { success: true, data: { id: result.id, userId: result.userId } };
  } catch (error) {
    return handleActionResult(error);
  }
}
