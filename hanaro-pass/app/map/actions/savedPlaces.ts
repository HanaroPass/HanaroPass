'use server';

import { type ActionResult, handleActionResult } from '@/lib/errorHandler';
import type { SavedPlace } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

/**
 * 저장된 장소 리스트 가져오기
 */
export async function getSavedPlaces(
  userId: number,
): Promise<ActionResult<SavedPlace[]>> {
  try {
    const places = await prisma.savedPlace.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return { success: true, data: places };
  } catch (error) {
    return handleActionResult(error);
  }
}
