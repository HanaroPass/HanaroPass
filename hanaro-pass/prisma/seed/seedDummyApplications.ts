import { prisma } from '../../lib/prisma'; // 경로 주의 (파일 위치에 따라 수정)

/**
 * [신규] ID 1, 2, 3번 병원을 대상으로 테스트 데이터 생성
 */
export async function seedDummyApplications() {
  console.log('[ 📝 병원 언어 등록 신청 테스트 데이터 생성 중... ]');

  const testEmail = 'sjo2088@naver.com';

  // 1. ID 1번: 신청 완료 (PENDING)
  await prisma.hospitalLanguageApplication.create({
    data: {
      hospitalId: 1,
      applicantEmail: testEmail,
      status: 'PENDING',
      requestLangs: ['en', 'cn'],
      createdAt: new Date('2026-01-19T09:43:00'),
    },
  });

  // 2. ID 2번: 승인 완료 (APPROVED)
  await prisma.hospitalLanguageApplication.create({
    data: {
      hospitalId: 2,
      applicantEmail: testEmail,
      status: 'APPROVED',
      requestLangs: ['jp'],
      createdAt: new Date('2026-01-10T14:20:00'),
      processedAt: new Date('2026-01-11T10:00:00'),
    },
  });

  // 3. ID 3번: 반려 (REJECTED)
  await prisma.hospitalLanguageApplication.create({
    data: {
      hospitalId: 3,
      applicantEmail: testEmail,
      status: 'REJECTED',
      requestLangs: ['vi', 'th'],
      createdAt: new Date('2026-01-15T11:30:00'),
      processedAt: new Date('2026-01-16T15:00:00'),
    },
  });

  console.log('[ 완료 ] 1(대기), 2(승인), 3(반려) 신청 데이터 생성 완료.');
}
