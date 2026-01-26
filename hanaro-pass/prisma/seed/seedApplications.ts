import { prisma } from '@/lib/prisma';

/**
 * [신규] ID 1, 2, 3번 병원을 대상으로 테스트 데이터 생성
 */
export async function seedDummyApplications() {
  console.log('[ 추가 작업 - ID 1, 2, 3번 대상 테스트 데이터 생성 중... ]');

  // 1. ID 1번: 신청 완료 (PENDING)
  // 상세 페이지에서 "노란색 상태 배지"와 "대기 중 타임라인" 확인용
  await prisma.hospitalLanguageApplication.create({
    data: {
      hospitalId: 1,
      status: 'PENDING',
      requestLangs: ['en', 'cn'], // 영어, 중국어 신청
      createdAt: new Date('2026-01-19T09:43:00'),
    },
  });

  // 2. ID 2번: 승인 완료 (APPROVED)
  // 상세 페이지에서 "초록색 상태 배지"와 "승인 완료 일시" 확인용
  await prisma.hospitalLanguageApplication.create({
    data: {
      hospitalId: 2,
      status: 'APPROVED',
      requestLangs: ['jp'], // 일본어 신청
      createdAt: new Date('2026-01-10T14:20:00'),
      processedAt: new Date('2026-01-11T10:00:00'), // 승인 처리됨
    },
  });

  // 3. ID 3번: 반려 (REJECTED)
  // 상세 페이지에서 "빨간색 상태 배지"와 "반려 일시" 확인용
  await prisma.hospitalLanguageApplication.create({
    data: {
      hospitalId: 3,
      status: 'REJECTED',
      requestLangs: ['vi', 'th'], // 베트남어, 태국어 신청
      createdAt: new Date('2026-01-15T11:30:00'),
      processedAt: new Date('2026-01-16T15:00:00'), // 반려 처리됨
    },
  });

  console.log('[ 완료 ] ID 1(대기), 2(승인), 3(반려) 데이터 생성 완료.');
}
