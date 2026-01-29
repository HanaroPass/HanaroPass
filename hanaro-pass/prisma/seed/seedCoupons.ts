import { prisma } from '@/lib/prisma';

export async function seedCoupons() {
  console.log('[쿠폰 데이터 생성 시작]');

  await prisma.coupon.createMany({
    data: [
      // -------------------------
      // 'FOOD'
      // -------------------------
      {
        tag: '#카페',
        discount: 10,
        category: 'FOOD',
        couponCode: 'HN-2025-000101',
        brandName: '스타벅스',
        brandPic:
          'https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg',
        latitude: '37.54462',
        longitude: '127.05612',
        description: '아메리카노 포함 음료 전 메뉴 10% 할인 (1일 1회)',
      },
      {
        tag: '#카페',
        discount: 15,
        category: 'FOOD',
        couponCode: 'HN-2025-000102',
        brandName: '투썸플레이스',
        brandPic:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Bi_img_logo.svg/1280px-Bi_img_logo.svg.png',
        latitude: '37.54398',
        longitude: '127.05510',
        description: '케이크/디저트 포함 결제 시 15% 할인 (3만원 이상 구매)',
      },
      {
        tag: '#편의점',
        discount: 3,
        category: 'FOOD',
        couponCode: 'HN-2025-000103',
        brandName: 'GS25',
        brandPic:
          'https://i.namu.wiki/i/5pf9ppFKCQV9VWb6vpQ4OTmpfwOUuRmiS1hYoKujRLhcFLQCi_6XpRJB0RiH-SMaJvr6s4Ube6Up3A9Yhmm9Dg.svg',
        latitude: '37.54445',
        longitude: '127.05572',
        description: '도시락/샌드위치 카테고리 3% 할인',
      },
      {
        tag: '#편의점',
        discount: 5,
        category: 'FOOD',
        couponCode: 'HN-2025-000104',
        brandName: 'CU',
        brandPic:
          'https://i.namu.wiki/i/TNW_s4zbDNDE04-zjpcZtYTRBnW6NyxANy6lkLo7iUuCS5G-38GRscCQZBUypUGO5zxZjZFRXDde0jM_tGV7XA.svg',
        latitude: '37.54511',
        longitude: '127.05635',
        description: '간편식/음료 구매 시 5% 즉시 할인 (2만원 이상 결제)',
      },
      {
        tag: '#치킨',
        discount: 12,
        category: 'FOOD',
        couponCode: 'HN-2025-000105',
        brandName: 'BBQ',
        brandPic: 'https://static.cdnlogo.com/logos/b/68/bbq.svg',
        latitude: '37.54340',
        longitude: '127.05488',
        description: '치킨 메뉴 전용 12% 할인 (포장 주문 가능, 배달 제외)',
      },
      {
        tag: '#버거',
        discount: 8,
        category: 'FOOD',
        couponCode: 'HN-2025-000106',
        brandName: '버거킹',
        brandPic:
          'https://i.namu.wiki/i/5IrysxQnQyGWVrB0OSXZE4fjmB1kizS-hg0tTaMAaKG_4ZnMdv_glXV31cpWgeZ2VHyF152gkOWJkoNf5Ge8lg.svg',
        latitude: '37.54602',
        longitude: '127.05522',
        description: '와퍼/세트 메뉴 8% 할인 (오후 2시~6시 해피타임)',
      },

      // -------------------------
      // FASHION
      // -------------------------
      {
        tag: '#SPA',
        discount: 5,
        category: 'FASHION',
        couponCode: 'HN-2025-000201',
        brandName: '무신사 스토어',
        brandPic: 'https://corp.musinsa.com/images/OG.png',
        latitude: '37.54410',
        longitude: '127.05780',
        description: '성수 스토어 오프라인 결제 5% 할인 (일부 브랜드 제외)',
      },
      {
        tag: '#SPA',
        discount: 7,
        category: 'FASHION',
        couponCode: 'HN-2025-000202',
        brandName: '무신사 스탠다드',
        brandPic: 'https://corp.musinsa.com/images/OG.png',
        latitude: '37.54372',
        longitude: '127.05820',
        description: '기본템/아우터 포함 7% 할인 (2개 이상 구매 시 적용)',
      },
      {
        tag: '#패션',
        discount: 10,
        category: 'FASHION',
        couponCode: 'HN-2025-000203',
        brandName: 'ABC마트',
        brandPic:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/ABC_MART_logo.svg/1280px-ABC_MART_logo.svg.png',
        latitude: '37.54558',
        longitude: '127.05470',
        description: '신발/용품 10% 할인 (세일 상품 일부 제외)',
      },
      {
        tag: '#트레이닝복',
        discount: 12,
        category: 'FASHION',
        couponCode: 'HN-2025-000204',
        brandName: '나이키',
        brandPic:
          'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
        latitude: '37.54620',
        longitude: '127.05705',
        description: '러닝/트레이닝 카테고리 12% 할인 (정가 상품 한정)',
      },
      {
        tag: '#패션',
        discount: 8,
        category: 'FASHION',
        couponCode: 'HN-2025-000205',
        brandName: '오프화이트 편집샵',
        brandPic:
          'https://wallpapers.com/images/hd/off-white-logo-background-v43ekqa14jb454yr.jpg',
        latitude: '37.54290',
        longitude: '127.05690',
        description: '편집샵 단독 상품 8% 할인 (액세서리/잡화 포함)',
      },
      {
        tag: '#가방',
        discount: 6,
        category: 'FASHION',
        couponCode: 'HN-2025-000206',
        brandName: '컨버스',
        brandPic:
          'https://i.namu.wiki/i/gbIRF18kM9cYyAg45zbz8A34JAHlDrj8AKvxBtQ-1pltEEUJKRN_DN8P391uQkBD0of4fvhunQH8ARBqV4nevw.svg',
        latitude: '37.54488',
        longitude: '127.05395',
        description: '스니커즈/의류 6% 할인 (학생 인증 시 추가 혜택)',
      },

      // -------------------------
      // BEAUTY
      // -------------------------
      {
        tag: '#뷰티',
        discount: 15,
        category: 'BEAUTY',
        couponCode: 'HN-2025-000301',
        brandName: '올리브영',
        brandPic:
          'https://i.namu.wiki/i/ovdxBO4DYplI-HtCu2RagQxb_3I9yzT7oHZrxuZdInUXcPF4gPkHzTJbrF3uhp9FDzHUYr0f-9Wjl6IhHhVREw.svg',
        latitude: '37.54472',
        longitude: '127.05490',
        description:
          '뷰티/헬스 전 품목 15% 할인 (3만원 이상 구매, 일부 브랜드 제외)',
      },
      {
        tag: '#향수',
        discount: 10,
        category: 'BEAUTY',
        couponCode: 'HN-2025-000302',
        brandName: '탬버린즈',
        brandPic:
          'https://www.brandb.net/_next/image?url=https%3A%2F%2Fapi.brandb.net%2Fapi%2Fv2%2Fcommon%2Fimage%3FfileId%3D21051&w=1920&q=75',
        latitude: '37.54325',
        longitude: '127.05855',
        description: '향수/핸드크림 10% 할인 (선물 포장 무료 제공)',
      },
      {
        tag: '#스킨',
        discount: 12,
        category: 'BEAUTY',
        couponCode: 'HN-2025-000303',
        brandName: '이니스프리',
        brandPic:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt7sMQf_kKFBeIDcx1ZbcGpMlLW7iIhyCv-w&s',
        latitude: '37.54590',
        longitude: '127.05680',
        description: '스킨케어 라인 12% 할인 (회원 가입 시 즉시 적용)',
      },
      {
        tag: '#헤어',
        discount: 20,
        category: 'BEAUTY',
        couponCode: 'HN-2025-000305',
        brandName: '준오헤어',
        brandPic:
          'https://www.brandb.net/_next/image?url=https%3A%2F%2Fapi.brandb.net%2Fapi%2Fv2%2Fcommon%2Fimage%3FfileId%3D26659&w=1920&q=75',
        latitude: '37.54640',
        longitude: '127.05595',
        description: '컷/클리닉 20% 할인 (첫 방문 고객 전용, 예약 필수)',
      },

      // -------------------------
      // ACTIVITY
      // -------------------------
      {
        tag: '#영화',
        discount: 10,
        category: 'ACTIVITY',
        couponCode: 'HN-2025-000404',
        brandName: 'CGV',
        brandPic:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntmucCbdS902B24l78XpjEYrcaHFAvfSh1w&s',
        latitude: '37.54430',
        longitude: '127.05910',
        description:
          '2D 영화 티켓 10% 할인 (동반 1인까지 적용, 주말/공휴일 제외)',
      },

      // -------------------------
      // TRAVEL
      // -------------------------
      {
        tag: '#입장권',
        discount: 15,
        category: 'TRAVEL',
        couponCode: 'HN-2025-000510',
        brandName: '롯데월드',
        brandPic:
          'https://i.namu.wiki/i/L_tYefe6ah63cDCobj_2zzX9CYNWKnBEJjzbOUu2zkn0NYFz1taumVfwIXzo8HdXRCRUCnEpfwUQNXVOIYu3hzQa_vHaUPoCgBVoX7WWzB7VF2AOe5SEMRNvMyPnQJ2AjYfFV8y0CoLY3Bty8ufwXw.svg',
        latitude: '37.5141653654',
        longitude: '127.1040749597',
        description: '자유이용권 15% 할인 (동반 1인까지, 주말/공휴일 제외)',
      },
      {
        tag: '#교통',
        discount: 8,
        category: 'TRAVEL',
        couponCode: 'HN-2025-000507',
        brandName: 'KTX',
        brandPic:
          'https://i.namu.wiki/i/5r9mJ5om_iZOjP1x00o3-PA0Sa24iLeK_MAtYG3Y5bDrzb9qAhdryROPYcBBA3anbTnNsqjmz0LKt9lKhXtlTQ.svg',
        latitude: '37.54420',
        longitude: '127.05430',
        description: 'KTX/ITX 예매 8% 할인 (왕복 예매 시, 일부 구간 제외)',
      },
    ],
    skipDuplicates: true,
  });

  console.log('[쿠폰 데이터 생성 완료]');
}
