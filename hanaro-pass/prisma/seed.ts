import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { seedDummyApplications } from './seed/seedApplications';
import { seedUserDocs, seedUserIdentityDocs } from './seed/seedDocuments';
import { fetchAndSeedHospitals, SERVICE_KEY } from './seed/seedHospitals';
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

  await prisma.userDocument.deleteMany();
  await prisma.aRC.deleteMany();
  await prisma.passport.deleteMany();
  await prisma.user.deleteMany();

  // AUTO_INCREMENT 초기화
  await prisma.$executeRaw`ALTER TABLE Hospital AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalDept AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLang AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalReview AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLanguageApplication AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Passport AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE ARC AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE UserDocument AUTO_INCREMENT = 1`;

  await fetchAndSeedHospitals();
  await seedUsers();
  await seedAdminUser();
  await seedUserDocs();
  await seedUserIdentityDocs();
  await seedDummyApplications();
  console.log('[ 시딩 작업 완료! ]');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
