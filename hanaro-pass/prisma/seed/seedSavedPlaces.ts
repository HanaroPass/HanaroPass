import { SAVED_PLACES_MOCK } from '@/app/map/constants/savedPlaces';
import type { PlaceCategory } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

/**
 * 모든 유저에게 공통된 SavedPlace 더미 데이터 주입
 */
export async function seedSavedPlaces() {
  console.log('[ SavedPlace 더미 생성 중... ]');

  const users = await prisma.user.findMany();

  for (const user of users) {
    const dataToInsert = SAVED_PLACES_MOCK.map((place) => ({
      ...place,
      userId: user.id,
      category: place.category as PlaceCategory,
    }));

    await prisma.savedPlace.createMany({
      data: dataToInsert,
    });
  }
  console.log(`[ 완료 ] ${users.length}명에게 장소 데이터 주입 완료`);
}
