'use server';

import { clearSession } from '@/lib/session';

export async function logout() {
  await clearSession();
}
