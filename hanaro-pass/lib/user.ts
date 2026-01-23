'use server';

import { getPassportFromSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

// 세션(암호화된 쿠키)에서 여권번호를 가져옴 (자동 복호화)
// DB에서 해당 번호와 연결된 userId 조회
export async function getUserId(): Promise<number | null> {
  try {
    // 세션에서 복호화된 여권번호 추출
    const passportNumber = await getPassportFromSession();

    if (!passportNumber) {
      return null;
    }

    //유저 아이디 조회
    const passportRow = await prisma.passport.findUnique({
      where: { passportNumber },
      select: { userId: true },
    });

    return passportRow?.userId ?? null;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as any).digest === 'DYNAMIC_SERVER_USAGE'
    ) {
      throw error;
    }

    console.error('getUserId 인증 에러:', error);
    return null;
  }
}

// 여권번호 있는지 (=로그인) 여부만 확인하기
export async function isAuthenticated(): Promise<boolean> {
  const userId = await getUserId();
  return userId !== null;
}
