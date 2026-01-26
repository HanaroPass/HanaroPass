import { prisma } from './prisma';
import { getUserIdFromSession } from './session';

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
