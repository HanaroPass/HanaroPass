import 'dotenv/config';
import { SAVED_PLACES_MOCK } from '@/app/map/constants/savedPlaces';
import type { PlaceCategory } from '@/lib/generated/prisma';
import { prisma } from '../lib/prisma';
import { seedDummyApplications } from './seed/seedApplications';
import { seedCoupons } from './seed/seedCoupons';
import { seedUserDocs, seedUserIdentityDocs } from './seed/seedDocuments';
import { fetchAndSeedHospitals, SERVICE_KEY } from './seed/seedHospitals';
import { seedUserCards } from './seed/seedUserCards';
import { seedAdminUser, seedUsers } from './seed/seedUsers';

/**
 * 모든 유저에게 공통된 SavedPlace 더미 데이터 주입
 */
async function seedSavedPlaces() {
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

async function main() {
  if (!SERVICE_KEY) {
    console.error('SERVICE_KEY 누락');
    process.exit(1);
  }

  console.log('[ 기존 데이터 초기화 중 ]');
  // 데이터 삭제
  await prisma.hospitalReview.deleteMany();
  await prisma.hospitalDept.deleteMany();
  await prisma.hospitalLang.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.savedPlace.deleteMany();

  await prisma.userDocument.deleteMany();
  await prisma.aRC.deleteMany();
  await prisma.passport.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();

  // AUTO_INCREMENT 초기화
  await prisma.$executeRaw`ALTER TABLE Hospital AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalDept AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLang AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalReview AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLanguageApplication AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE SavedPlace AUTO_INCREMENT = 1`;

  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Passport AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE ARC AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE UserDocument AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Coupons AUTO_INCREMENT = 1`;

  await fetchAndSeedHospitals();
  await seedUsers();
  await seedAdminUser();
  await seedUserDocs();
  await seedUserIdentityDocs();
  await seedDummyApplications();

  await seedUserCards();
  await seedCoupons();
  await seedSavedPlaces();

  console.log('[ 시딩 작업 완료! ]');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
