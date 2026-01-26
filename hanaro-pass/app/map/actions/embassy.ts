'use server';

import { unstable_cache } from 'next/cache';
import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import type { Embassy } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

const getCachedEmbassy = unstable_cache(
  async (nationality: string) => {
    return await prisma.embassy.findFirst({
      where: { nationality },
    });
  },
  ['embassy-details'],
  {
    revalidate: 86400,
    tags: ['embassy'],
  },
);

/**
 * 유저 ID를 받아 해당 유저 국적의 대사관 정보를 반환
 */
export async function getMyEmbassy(
  userId: number,
): Promise<ActionResult<Embassy | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { nationality: true },
    });

    if (!user) {
      throw new HttpError('해당 유저를 찾을 수 없습니다.', 404);
    }
    const data = await getCachedEmbassy(user.nationality);

    return { success: true, data };
  } catch (error) {
    return handleActionResult(error);
  }
}
