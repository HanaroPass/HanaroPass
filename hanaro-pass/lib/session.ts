import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { z } from 'zod';

const SessionSchema = z.object({
  userId: z.number().int().positive().optional(),
});

type SessionData = z.infer<typeof SessionSchema>;

// 세션 설정
const sessionOptions = {
  password:
    process.env.SESSION_PASSWORD ||
    'complex_password_at_least_32_characters_long',
  cookieName: 'user_secure_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};

// 세션 가져오기
export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );
  return session;
}

// 유저 아이디 저장 (암호화되어 브라우저 쿠키에 저장)
export async function saveUserIdToSession(userId: number) {
  const parsed = z.number().int().positive().safeParse(userId);
  if (!parsed.success) throw new Error('유효하지 않은 userId 입니다.');

  const session = await getSession();
  session.userId = parsed.data;
  await session.save();
}

// 유저 아이디 꺼내기 (자동으로 복호화)
export async function getUserIdFromSession(): Promise<number | null> {
  const session = await getSession();
  const result = SessionSchema.safeParse(session);

  if (!result.success || !result.data.userId) return null;
  return result.data.userId;
}

// 세션 삭제 (로그아웃 혹은 만료 시)
export async function clearSession() {
  const session = await getSession();
  session.destroy();
}

// 세션이 있는지 여부 확인
export async function isAuthenticated(): Promise<boolean> {
  const userId = await getUserIdFromSession();
  return userId !== null;
}
