import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// 세션 데이터 타입 정의
interface SessionData {
  passportNumber?: string;
}

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
  const session = await getSession();
  session.passportNumber = passportNo; // iron-session이 자동으로 암호화함
  await session.save();
}

// 여권번호 꺼내기 (자동으로 복호화)
export async function getPassportFromSession() {
  const session = await getSession();
  return session.passportNumber || null;
}

// 세션 삭제 (로그아웃 혹은 만료 시)
export async function clearSession() {
  const session = await getSession();
  session.destroy();
}
