import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { z } from 'zod';

// 세션 데이터 타입 정의
const SessionSchema = z.object({
  passportNumber: z.string().min(1, '여권 번호는 필수입니다.').optional(),
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

// 여권번호 저장 (암호화되어 브라우저 쿠키에 저장)
export async function savePassportToSession(passportNo: string) {
  const validation = z.string().min(1).safeParse(passportNo);

  if (!validation.success) {
    throw new Error('유효하지 않은 여권 번호입니다.');
  }

  const session = await getSession();
  session.passportNumber = validation.data;
  await session.save();
}

// 여권번호 꺼내기 (자동으로 복호화)
export async function getPassportFromSession(): Promise<string | null> {
  const session = await getSession();

  const result = SessionSchema.safeParse(session);

  if (!result.success || !result.data.passportNumber) {
    return null;
  }

  return result.data.passportNumber;
}

// 세션 삭제 (로그아웃 혹은 만료 시)
export async function clearSession() {
  const session = await getSession();
  session.destroy();
}
