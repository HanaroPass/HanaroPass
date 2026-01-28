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
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
};

export async function savePassportData(
  _prevState: ActionResult<Record<string, string>> | null,
  formData: FormData,
): Promise<ActionResult<Record<string, string>>> {
  try {
    const passportNumber = formData.get('passportNumber') as string;
    const gender = formData.get('gender') as string;
    const issueDate = formData.get('issueDate') as string;
    const expiryDate = formData.get('expiryDate') as string;
    const lastName = formData.get('lastName') as string;
    const firstName = formData.get('firstName') as string;
    const userPhotoUrl = formData.get('userPhotoUrl') as string;
    const nationality = formData.get('nationality') as string;

    // 개별 필드 검증으로 더 구체적인 에러 메시지 제공
    if (!nationality) {
      throw new HttpError('국적을 선택해주세요.', 400);
    }

    if (!passportNumber) {
      throw new HttpError('여권번호를 입력해주세요.', 400);
    }

    if (!gender) {
      throw new HttpError('성별을 선택해주세요.', 400);
    }

    if (!issueDate || !expiryDate) {
      throw new HttpError('여권 발급일과 만료일을 입력해주세요.', 400);
    }

    if (!lastName || !firstName) {
      throw new HttpError('성명을 입력해주세요.', 400);
    }

    // 여권 만료일 검증
    const expiryDateObj = parseLocalDate(expiryDate);
    if (expiryDateObj <= new Date()) {
      throw new HttpError('만료된 여권은 등록할 수 없습니다.', 400);
    }

    const sessionUserId = await getUserIdFromSession();

    const nickname = `${lastName} ${firstName}`.trim();

    const result = await prisma.$transaction(async (tx) => {
      // 기존에 동일한 여권번호를 가진 정보가 있는지 먼저 확인
      const existingPassport = await tx.passport.findUnique({
        where: { passportNumber },
        select: { id: true, userId: true },
      });

      if (existingPassport) {
        // 이미 존재하는 여권인 경우 막기
        if (sessionUserId && existingPassport.userId !== sessionUserId) {
          throw new HttpError('이미 다른 계정에 등록된 여권번호입니다.', 409);
        }
        return existingPassport;
      }

      // 여권번호가 신규라면: 로그인 상태면 그 userId로 연결, 아니면 user 생성
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

      return await tx.passport.create({
        data: {
          userId: userIdToUse,
          passportNumber,
          gender: gender as 'MALE' | 'FEMALE' | 'OTHERS',
          issueDate: parseLocalDate(issueDate),
          expiryDate: parseLocalDate(expiryDate),
          userPhotoUrl: userPhotoUrl || '',
        },
        select: { id: true, userId: true },
      });
    });

    // 세션 저장
    await saveUserIdToSession(result.userId);

    return {
      success: true,
      data: {
        passportNumber,
        gender,
        issueDate,
        expiryDate,
        lastName,
        firstName,
        nationality,
      },
    };
  } catch (error: unknown) {
    return handleActionResult(error);
  }
}
