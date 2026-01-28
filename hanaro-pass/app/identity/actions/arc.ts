'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import { prisma } from '@/lib/prisma';
import { getUserIdFromSession, saveUserIdToSession } from '@/lib/session';

const parseLocalDate = (dateStr: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new HttpError('날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)', 400);
  }
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export async function saveArcData(
  prevState: ActionResult<{ id: number; userId: number }> | null,
  formData: FormData,
): Promise<ActionResult<{ id: number; userId: number }>> {
  try {
    const sessionUserId = await getUserIdFromSession();

    const registrationNumber = formData.get('registrationNumber') as string;
    const registrationNumberSuffix = formData.get('registrationNumberSuffix') as string;
    const residenceStatus = formData.get('residenceStatus') as string;
    const issueDate = formData.get('issueDate') as string;
    const userPhotoUrl = (formData.get('userPhotoUrl') as string) || '';
    const lastName = formData.get('lastName') as string;
    const firstName = formData.get('firstName') as string;
    const nationality = formData.get('nationality') as string;

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
    if (!issueDate) {
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
        // 이미 존재하는 신분증인 경우 막기
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
          issueDate: parseLocalDate(issueDate),
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
