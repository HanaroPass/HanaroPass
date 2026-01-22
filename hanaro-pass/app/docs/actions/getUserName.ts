'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const PASSPORT_TOKEN_COOKIE = 'pntoken';
// 암호화된 여권번호 값이 dev:<passportNumber>라고 가정 후 개발
// 추후 구현 예정
function decodePassportFromToken(token: string | undefined | null) {
  if (!token) return null;
  if (token.startsWith('dev:')) return token.replace('dev:', '');

  return null;
}

export async function getCurrentUserName() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PASSPORT_TOKEN_COOKIE)?.value;
  console.log('pntoken=', token);
  const passportNumber = decodePassportFromToken(token);

  if (!passportNumber) return null;

  // Passport-User 조인해서 nickname 가져오기
  const passport = await prisma.passport.findUnique({
    where: { passportNumber },
    select: { User: { select: { nickname: true } } },
  });

  return passport?.User?.nickname ?? null;
}
