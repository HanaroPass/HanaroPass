import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { seedDummyApplications } from './seed/seedApplications';
import { seedCoupons } from './seed/seedCoupons';
import { seedUserDocs, seedUserIdentityDocs } from './seed/seedDocuments';
import { seedEmbassies } from './seed/seedEmbassies';
import { fetchAndSeedHospitals, SERVICE_KEY } from './seed/seedHospitals';
import { seedNotifications } from './seed/seedNotifications';
import { seedSavedPlaces } from './seed/seedSavedPlaces';
import { seedUserCards } from './seed/seedUserCards';
import { seedAdminUser, seedUsers } from './seed/seedUsers';

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
  await prisma.embassy.deleteMany();

  await prisma.userDocument.deleteMany();
  await prisma.aRC.deleteMany();
  await prisma.passport.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.notification.deleteMany();

  // AUTO_INCREMENT 초기화
  await prisma.$executeRaw`ALTER TABLE Hospital AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalDept AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLang AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalReview AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLanguageApplication AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE SavedPlace AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Embassy AUTO_INCREMENT = 1`;

  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Passport AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE ARC AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE UserDocument AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Coupons AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE UserCard AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Notification AUTO_INCREMENT = 1`;

  await fetchAndSeedHospitals();
  await seedUsers();
  await seedAdminUser();
  await seedUserDocs();
  await seedUserIdentityDocs();
  await seedDummyApplications();

  await seedNotifications();

  await seedUserCards();
  await seedCoupons();
  await seedSavedPlaces();
  await seedEmbassies();
  console.log('[ 시딩 작업 완료! ]');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
