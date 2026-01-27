import { prisma } from '@/lib/prisma';

export async function seedNotifications() {
  console.log('[ 추가 작업 - 알림(Notification) 50개 생성 중... ]');

  // 1. 대상 유저 가져오기 (1번 유저 대상)
  const user = await prisma.user.findFirst({
    where: { id: 1 },
  });

  if (!user) {
    console.error('[ 에러 ] 유저(ID: 1)가 없어 알림을 생성할 수 없습니다.');
    return;
  }

  // 2. 방금 생성한 신청서 데이터 가져오기
  const applications = await prisma.hospitalLanguageApplication.findMany();

  if (applications.length === 0) {
    console.warn('[ 경고 ] 신청서 데이터가 없습니다. 일반 알림만 생성합니다.');
  }

  const notifications = [];

  for (let i = 1; i <= 50; i++) {
    // 3. 신청서 데이터와 연결 (순환하며 참조)
    const app =
      applications.length > 0 ? applications[i % applications.length] : null;

    let title = '';
    let content = '';
    const isRead = i > 5; // 최신 5개는 읽지 않음(false), 나머지는 읽음(true) 처리

    // 4. APPROVED, REJECTED 상태에 따른 알림 생성
    if (app && (app.status === 'APPROVED' || app.status === 'REJECTED')) {
      const isApproved = app.status === 'APPROVED';
      title = isApproved
        ? '의료 통역 서비스 승인 완료'
        : '의료 통역 서비스 신청 반려';
      content = isApproved
        ? `신청하신 ${app.id}번 병원 통역 서비스가 승인되었습니다. 예약 시간에 방문해주세요.`
        : `신청하신 ${app.id}번 병원 통역 서비스가 서류 미비로 반려되었습니다. 사유를 확인해주세요.`;
    } else {
      // PENDING이거나 신청서가 없는 경우 일반 시스템 알림
      const systemTypes = [
        {
          t: '환전 우대 쿠폰 도착',
          c: '하나로패스 회원님만을 위한 90% 환전 우대 쿠폰이 발급되었습니다.',
        },
        {
          t: '새로운 공지사항',
          c: '서비스 이용 약관이 변경되었습니다. 확인 부탁드립니다.',
        },
        { t: '카드 발급 안내', c: '신청하신 체크카드가 배송을 시작했습니다.' },
      ];
      const type = systemTypes[i % systemTypes.length];
      title = type.t;
      content = type.c;
    }

    notifications.push({
      userId: user.id,
      title,
      content,
      isRead,
      // 5. 시간을 현재로부터 1시간 간격으로 과거로 설정 (정렬 테스트용)
      createdAt: new Date(Date.now() - i * 60 * 60 * 1000),
    });
  }

  // 6. 데이터 일괄 삽입
  await prisma.notification.createMany({
    data: notifications,
  });

  console.log(`[ 완료 ] 총 50개의 알림이 생성되었습니다. (userId: ${user.id})`);
}
