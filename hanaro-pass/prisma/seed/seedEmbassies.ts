import { EMBASSY_DATA } from '@/app/map/constants/embassy';
import { prisma } from '@/lib/prisma';

export async function seedEmbassies() {
  console.log('[ 대사관 데이터 시딩 시작 ]');

  await prisma.embassy.createMany({
    data: EMBASSY_DATA,
  });

  console.log(`[ 완료 ] 총 ${EMBASSY_DATA.length}개의 대사관 데이터 생성 완료`);
}
