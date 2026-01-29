'use server';
import { getUserName } from '@/lib/user';

export async function getName() {
  const name = (await getUserName()) ?? 'HANA';
  return name;
}
