import { prisma } from '@/lib/prisma';

/**
 * User 더미 데이터 생성
 * - nickname+nationality 조합이 같으면 기존 데이터 유지
 */
export async function seedUsers() {
  console.log('[ 추가 작업 - User 더미 데이터 생성 중... ]');

  const users = [
    { nickname: 'Kelsey Kwon', nationality: 'KOR' },
    { nickname: 'John Doe', nationality: 'USA' },
    { nickname: 'Mina Tanaka', nationality: 'JPN' },
  ] as const;

  for (const u of users) {
    // nickname이 unique가 아니라서 upsert를 못 씀 -> find 후 create
    const exists = await prisma.user.findFirst({
      where: { nickname: u.nickname, nationality: u.nationality },
      select: { id: true },
    });

    if (exists) continue;

    await prisma.user.create({ data: u });
  }

  const count = await prisma.user.count();
  console.log(`[ 완료 ] User 생성/확인 완료. 현재 User 총 ${count}명`);
}

/**
 * [신규] 관리자(ADMIN) 유저 생성
 */
export async function seedAdminUser() {
  console.log('[ 추가 작업 - 관리자 유저 생성 중... ]');

  const adminData = {
    nickname: '관리자',
    nationality: 'KOR',
    role: 'ADMIN',
  } as const;

  const exists = await prisma.user.findFirst({
    where: { nickname: adminData.nickname, role: 'ADMIN' },
    select: { id: true },
  });

  if (!exists) {
    await prisma.user.create({
      data: adminData,
    });
    console.log('[ 완료 ] 관리자 유저가 생성되었습니다.');
  } else {
    console.log('[ 완료 ] 이미 관리자 유저가 존재합니다.');
  }
}
