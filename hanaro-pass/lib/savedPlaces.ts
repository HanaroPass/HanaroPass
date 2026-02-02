import { SAVED_PLACES_DATA } from '@/app/map/constants/savedPlaces';
import type { PlaceCategory, Prisma } from '@/lib/generated/prisma';

/**
 * 유저 생성 시 기본 장소 25개를 랜덤으로 넣어주는 함수
 */
export async function createDefaultSavedPlaces(
  tx: Prisma.TransactionClient,
  userId: number,
) {
  const shuffled = [...SAVED_PLACES_DATA].sort(() => Math.random() - 0.5);
  const selectedPlaces = shuffled.slice(0, 25);

  const dataToInsert = selectedPlaces.map((place) => ({
    userId: userId,
    nameKo: place.nameKo,
    nameEn: place.nameEn,
    addressKo: place.addressKo,
    addressEn: place.addressEn,
    category: place.category as PlaceCategory,
    latitude: place.latitude,
    longitude: place.longitude,
    openHours: place.openHours,
    phone: place.phone,
  }));

  await tx.savedPlace.createMany({
    data: dataToInsert,
  });
}
