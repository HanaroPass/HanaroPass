import { prisma } from '@/lib/prisma';

/**
 * [API 설정]
 */
export const SERVICE_KEY = process.env.HOSPITAL_API_SERVICE_KEY;
export const BASIS_API_URL =
  'https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList';
const DEPT_API_URL =
  'https://apis.data.go.kr/B551182/MadmDtlInfoService2.7/getDgsbjtInfo2.7';
export const TARGET_DISTRICTS = [
  { name: '광진구', sgguCd: '110023' },
  { name: '성동구', sgguCd: '110011' },
  { name: '강남구', sgguCd: '110001' },
  { name: '중구', sgguCd: '110017' },
  { name: '마포구', sgguCd: '110009' },
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

// 병원 이미지 경로
const HOSPITAL_IMAGE_MAP: Record<string, string> = {
  건국대학교병원: '/images/hospitals/konkuk.jpg',
  혜민병원: '/images/hospitals/hemin.jpg',
  바른본병원: '/images/hospitals/bareun.jpg',
  서울프라임병원: '/images/hospitals/prime.jpg',
  연세무척나은병원: '/images/hospitals/mucheok.jpg',
  제니스병원: '/images/hospitals/zenith.jpg',
  국립정신건강센터: '/images/hospitals/national_mental_health.jpg',
  '(사)인구보건복지협회 서울지회 가족보건의원':
    '/images/hospitals/family_health.jpg',
  '24시열린의원': '/images/hospitals/24open.jpg',
  '365류마고내과의원': '/images/hospitals/365rheuma.jpg',
  '365아산원탑마취통증의학과재활의학과의원': '/images/hospitals/365asan.jpg',
  'Dr. 고 신경정신과의원': '/images/hospitals/drko.jpg',
  한양대학교병원: '/images/hospitals/hanyang.jpg',
  재단법인베스티안재단베스티안서울병원: '/images/hospitals/bestian.jpg',
  '9988병원': '/images/hospitals/9988.jpg',
  연세바로척병원: '/images/hospitals/yonsei_chuk.jpg',
  연세슬기병원: '/images/hospitals/yonsei_seulgi.jpg',
  '학교법인대진교육재단 제인병원': '/images/hospitals/jain.jpg',
  '1삼성탑의원': '/images/hospitals/samsungtop.jpg',
  '365다움의원': '/images/hospitals/365daum.jpg',
};

// 병원 이미지 랜덤
const REAL_HOSPITAL_IMAGES = Object.values(HOSPITAL_IMAGE_MAP);

const getRandomHospitalImage = () => {
  return REAL_HOSPITAL_IMAGES[
    Math.floor(Math.random() * REAL_HOSPITAL_IMAGES.length)
  ];
};

/**
 * 확률 기반 언어 랜덤 배정 함수
 */
export const getRandomLangs = () => {
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
// imageUrl이 비어 있을 때만 쓰는 fallback
export const getDefaultHospitalImage = () => {
  return '/images/hospitals/default.jpg';
};
export const normalizeItems = (items: any) => {
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
};
export async function getHospitalDepartments(ykiho: string) {
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
export async function fetchAndSeedHospitals() {
  console.log('[ 시딩 작업 시작 - 광진구 / 성동구 병원 데이터 수집 ]');

  for (const district of TARGET_DISTRICTS) {
    console.log(`[ 시딩 작업 시작 - ${district.name} 데이터 수집 중... ]`);

    const params = new URLSearchParams({
      ServiceKey: SERVICE_KEY!,
      pageNo: '1',
      numOfRows: '15',
      sidoCd: '110000',
      sgguCd: district.sgguCd,
      _type: 'json',
    });

    try {
      const response = await fetch(`${BASIS_API_URL}?${params.toString()}`);

      const arrayBuffer = await response.arrayBuffer();
      const decoder = new TextDecoder('utf-8');
      const decodedText = decoder.decode(arrayBuffer);
      const result = JSON.parse(decodedText);

      if (!result.response?.body?.items) {
        console.warn(`[ 경고 ] ${district.name}: 응답 데이터가 없습니다.`);
        continue;
      }

      const items = normalizeItems(result.response.body.items.item);
      console.log(
        `[ 시딩 작업 완료 - ${district.name}: 총 ${items.length}개의 병원 발견.`,
      );

      for (const item of items) {
        if (item.yadmNm.includes('요양')) {
          console.log(`[ 제외 ] 요양 관련 병원: ${item.yadmNm}`);
          continue;
        }
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
            imageUrl:
              HOSPITAL_IMAGE_MAP[item.yadmNm] ?? getRandomHospitalImage(),
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
