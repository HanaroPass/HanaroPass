import { HttpError } from './errorHandler';
import { prisma } from './prisma';
import { getSession, getUserIdFromSession } from './session';

// 사용자 이름 가져오기
export async function getUserName() {
  const userId = await getUserIdFromSession();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { nickname: true },
  });

  return user?.nickname ?? null;
}

export async function validateAdmin() {
  const userId = await getUserIdFromSession();

  if (!userId) {
    throw new HttpError('로그인이 필요한 서비스입니다.', 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }, // role 필드 확인
  });

  if (user?.role !== 'ADMIN') {
    throw new HttpError('관리자 권한이 없습니다.', 403);
  }

  return user;
}

export async function validateUser() {
  const session = await getSession();
  if (!session?.userId) {
    throw new HttpError('로그인이 필요한 서비스입니다.', 401);
  }
  return session.userId; // 인증된 유저의 ID를 반환
}
