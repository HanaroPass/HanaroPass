'use server';

import { savePassportToSession } from '@/lib/session';

// 테스트를 위해 강제로 세션을 생성해주는 액션
export async function setupTestSession(passportNo: string) {
  console.log('테스트 세션 생성 시도:', passportNo);
  await savePassportToSession(passportNo);
  return '세션 생성 완료! 새로고침 해보세요.';
}
