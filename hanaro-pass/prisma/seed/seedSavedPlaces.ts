import { SAVED_PLACES_DATA } from '@/app/map/constants/savedPlaces';
import type { PlaceCategory } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

/**
 * 모든 유저에게 SavedPlace 더미 데이터를 랜덤으로 25개씩 주입
 */
export async function seedSavedPlaces() {
  console.log('[ SavedPlace 더미 생성 중... ]');

  const users = await prisma.user.findMany();

  for (const user of users) {
    const shuffled = [...SAVED_PLACES_DATA].sort(() => Math.random() - 0.5);

    const selectedPlaces = shuffled.slice(0, 25);

    const dataToInsert = selectedPlaces.map((place) => ({
      ...place,
      userId: user.id,
      category: place.category as PlaceCategory,
    }));

    await prisma.savedPlace.createMany({
      data: dataToInsert,
    });
  }

  console.log(`[ 완료 ] ${users.length}명에게 랜덤 장소 25개씩 주입 완료`);
}
