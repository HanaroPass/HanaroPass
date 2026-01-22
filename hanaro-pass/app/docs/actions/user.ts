'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const PASSPORT_TOKEN_COOKIE = 'token';
// 암호화된 여권번호 값이 dev:<passportNumber>라고 가정 후 개발
// 추후 구현 예정
function decodePassportFromToken(token: string | undefined | null) {
  if (!token) return null;
  if (token.startsWith('dev:')) return token.replace('dev:', '');
  return null;
}

export async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PASSPORT_TOKEN_COOKIE)?.value;
  console.log(token);
  const passportNumber = decodePassportFromToken(token);

  if (!passportNumber) return null;

  const passportRow = await prisma.passport.findUnique({
    where: { passportNumber },
    select: { userId: true },
  });

  return passportRow?.userId ?? null;
}
