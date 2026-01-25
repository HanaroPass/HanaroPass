'use server';

import type { SavedPlace } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

/**
 * 저장된 장소 리스트 가져오기
 */
export async function getSavedPlaces(userId: number): Promise<SavedPlace[]> {
  try {
    const places = await prisma.savedPlace.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return places;
  } catch (error) {
    console.error('Failed to fetch saved places:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
}
