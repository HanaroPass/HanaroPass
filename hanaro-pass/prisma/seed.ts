import 'dotenv/config';
import { prisma } from '../lib/prisma';

/**
 * [API 설정]
 */
const SERVICE_KEY = process.env.HOSPITAL_API_SERVICE_KEY;
const BASIS_API_URL =
  'https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList';
const DEPT_API_URL =
  'https://apis.data.go.kr/B551182/MadmDtlInfoService2.7/getDgsbjtInfo2.7';

// 향후 강남구까지 확장 가능
const TARGET_DISTRICTS = [
  { name: '광진구', sgguCd: '110023' },
  { name: '성동구', sgguCd: '110011' },
];

// 네이버 지도 기준 지원 하는 진료과목 리스트 로딩
const DEPT_CODE_MAP: Record<string, string> = {
  '01': '내과',
  '02': '신경과',
  '03': '정신건강의학과',
  '04': '외과',
  '05': '정형외과',
  '06': '신경외과',
  '07': '흉부외과',
  '08': '성형외과',
  '09': '마취통증의학과',
  '10': '산부인과',
  '11': '소아청소년과',
  '12': '안과',
  '13': '이비인후과',
  '14': '피부과',
  '15': '비뇨의학과',
  '16': '영상의학과',
  '21': '재활의학과',
  '23': '가정의학과',
  '50': '치과',
  '80': '한의원',
};

/**
 * 확률 기반 언어 랜덤 배정 함수
 */
const getRandomLangs = () => {
  const result = ['한국어']; // 무조건 포함 (100%)

  // 확률 설정 데이터
  const candidates = [
    { name: '영어', probability: 0.7 },
    { name: '중국어', probability: 0.3 },
    { name: '일본어', probability: 0.3 },
    { name: '베트남어', probability: 0.05 },
    { name: '태국어', probability: 0.05 },
    { name: '필리핀어', probability: 0.05 },
    { name: '인도네시아어', probability: 0.05 },
    { name: '러시아어', probability: 0.05 },
    { name: '우즈베키스탄어', probability: 0.05 },
  ];

  // 각 언어별로 주사위를 굴려 당첨된 것들만 필터링
  const passed = candidates
    .filter((c) => Math.random() < c.probability)
    .map((c) => c.name);

  // 당첨된 언어들을 무작위로 섞음
  const shuffled = passed.sort(() => 0.5 - Math.random());

  // 최대 3개(한국어 1개 + 추가 2개)까지만 선택
  const extraLangs = shuffled.slice(0, 2);

  return [...result, ...extraLangs];
};

// picsum 사진에서 랜덤 이미지 가져오기
const getRandomHospitalImage = () => {
  const randomId = Math.floor(Math.random() * 50) + 1;
  return `https://picsum.photos/seed/med-${randomId}/800/600`;
};

const normalizeItems = (items: any) => {
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
};

async function getHospitalDepartments(ykiho: string) {
  const params = new URLSearchParams({
    ServiceKey: SERVICE_KEY!,
    ykiho: ykiho,
    _type: 'json',
  });

  try {
    const response = await fetch(`${DEPT_API_URL}?${params.toString()}`);
    if (!response.ok) {
      console.warn(
        `[ 부서 조회 실패 ] ykiho=${ykiho} status=${response.status}`,
      );
      return [];
    }
    const result = await response.json();
    const items = normalizeItems(result.response?.body?.items?.item);

    return items
      .map((item: any) => {
        const code = String(item.dgsbjtCd).padStart(2, '0');
        const name = DEPT_CODE_MAP[code];
        return name ? { deptName: name } : null;
      })
      .filter(Boolean) as { deptName: string }[];
  } catch (error) {
    console.error(`[ 부서 조회 실패 ] ykiho=${ykiho}`, error);
    return [];
  }
}

async function fetchAndSeed() {
  console.log('[ 시딩 작업 시작 - 광진구 / 성동구 병원 데이터 수집 ]');

  for (const district of TARGET_DISTRICTS) {
    console.log(`[ 시딩 작업 시작 - ${district.name} 데이터 수집 중... ]`);

    const params = new URLSearchParams({
      ServiceKey: SERVICE_KEY!,
      pageNo: '1',
      numOfRows: '2000',
      sidoCd: '110000',
      sgguCd: district.sgguCd,
      _type: 'json',
    });

    try {
      const response = await fetch(`${BASIS_API_URL}?${params.toString()}`);
      const result = await response.json();

      if (!result.response?.body?.items) {
        console.warn(`[ 경고 ] ${district.name}: 응답 데이터가 없습니다.`);
        continue;
      }

      const items = normalizeItems(result.response.body.items.item);
      console.log(
        `[ 시딩 작업 완료 - ${district.name}: 총 ${items.length}개의 병원 발견.`,
      );

      for (const item of items) {
        const departments = await getHospitalDepartments(item.ykiho);
        const langs = getRandomLangs(); // 확률 로직 적용 - 최대 3개까지 언어 지원 가능

        const latitude = Number(item.YPos);
        const longitude = Number(item.XPos);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          console.warn(`[ 좌표 누락 ] ${item.yadmNm} (${item.ykiho})`);
          continue;
        }

        await prisma.hospital.create({
          data: {
            nameKo: item.yadmNm,
            imageUrl: getRandomHospitalImage(),
            address: item.addr,
            latitude,
            longitude,
            phone: item.telno || null,
            openHours: '09:00 - 18:00',
            HospitalDept: {
              create:
                departments.length > 0 ? departments : [{ deptName: '일반의' }], // 만약에 없으면, 그냥 일반의로
            },
            HospitalLang: {
              create: langs.map((langName) => ({ langName })),
            },
            HospitalReview: {
              create: {
                aiSummary: `${item.yadmNm}은(는) ${district.name} 소재 의료기관입니다. 지원 언어: ${langs.join(', ')}`,
              },
            },
          },
        });
        await new Promise((r) => setTimeout(r, 50));
      }
    } catch (error) {
      console.error(`[ 에러 ] ${district.name} 에러:`, error);
    }
  }
}

/**
 * [신규] ID 1, 2, 3번 병원을 대상으로 테스트 데이터 생성
 */
async function seedDummyApplications() {
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

/**
 * User 더미 데이터 생성
 */
async function seedUsers() {
  console.log('[ 추가 작업 - User 더미 데이터 생성 중... ]');

  // 더미 생성
  await prisma.user.createMany({
    data: [
      { nickname: 'Kelsey Kwon', nationality: 'KOR' },
      { nickname: 'John Doe', nationality: 'USA' },
      { nickname: 'Mina Tanaka', nationality: 'JPN' },
    ],
  });

  const count = await prisma.user.count();
  console.log(`[ 완료 ] User 생성 완료. 현재 User 총 ${count}명`);
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
  await prisma.user.deleteMany();

  // AUTO_INCREMENT 초기화
  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Hospital AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalDept AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLang AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalReview AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE HospitalLanguageApplication AUTO_INCREMENT = 1`;

  await fetchAndSeed();
  await seedDummyApplications();
  await seedUsers();
  await seedDummyApplications();
  console.log('[ 시딩 작업 완료! ]');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
