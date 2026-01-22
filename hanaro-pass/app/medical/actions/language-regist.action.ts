'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import type { Hospital } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import { NAME_TO_ID } from '../constants/language';

/**
 * [병원 검색 서버 액션]
 *
 * 검색어 내의 모든 공백(Space)을 무시하고 검색을 수행합니다.
 * @param query - 사용자가 입력한 검색어 (병원명)
 * @returns {Promise<ActionResult<Pick<Hospital, 'id' | 'nameKo' | 'address'>[]>>}
 * 성공 시 검색된 병원 리스트(ID, 이름, 주소)를 반환합니다.
 */
export async function searchHospitalAction(
  query: string,
): Promise<ActionResult<Pick<Hospital, 'id' | 'nameKo' | 'address'>[]>> {
  try {
    const sanitizedQuery = query.replace(/\s+/g, '');
    if (!sanitizedQuery) return { success: true, data: [] };

    const hospitals = await prisma.$queryRaw<
      Pick<Hospital, 'id' | 'nameKo' | 'address'>[]
    >`
  SELECT id, nameKo, address 
  FROM Hospital 
  WHERE REPLACE(nameKo, ' ', '') LIKE ${`%${sanitizedQuery}%`}
`;

    return { success: true as const, data: hospitals };
  } catch (err) {
    // DB 연결 오류 or 예상치 못한 서버 장애 시
    return handleActionResult(err);
  }
}

/**
 * [병원 상세 서버 액션]
 *
 * 특정 ID를 가진 병원의 정보를 조회합니다.
 * 언어 등록 신청 페이지에서 병원명을 노출하기 위해 사용됩니다.
 *
 * * @param id - 조회할 병원의 고유 ID (UnsignedInt)
 * @returns {Promise<ActionResult<{ nameKo: string }>>}
 * 성공 시 병원의 국문 명칭을 반환합니다.
 * @throws {HttpError} 병원을 찾을 수 없는 경우 404 에러를 발생시킵니다.
 */
export async function getHospitalDetailAction(
  id: number,
): Promise<
  ActionResult<{ nameKo: string; existingLangs: string[]; isPending: boolean }>
> {
  try {
    const hospital = await prisma.hospital.findUnique({
      where: {
        id,
      },
      select: {
        nameKo: true,
        HospitalLang: {
          select: { langName: true },
        },
      },
    });

    if (!hospital)
      throw new HttpError('해당 ID의 병원을 찾을 수 없습니다.', 404);

    const pendingApp = await prisma.hospitalLanguageApplication.findFirst({
      where: {
        hospitalId: id,
        status: 'PENDING',
      },
    });

    const mappedLangs = hospital.HospitalLang.map(
      (lang) => NAME_TO_ID[lang.langName] || lang.langName,
    );

    return {
      success: true,
      data: {
        nameKo: hospital.nameKo,
        existingLangs: mappedLangs,
        isPending: !!pendingApp, // 신청 중인 건이 있으면 true
      },
    };
  } catch (err) {
    return handleActionResult(err);
  }
}

/**
 * [외국어 가능 폼 신청 제출 API]
 *
 * 사용자가 선택한 병원과 언어 리스트를 바탕으로 '언어 등록 신청서'를 생성.
 * 실제 서비스 데이터(HospitalLang)에 바로 반영되지 않고, 심사를 위해 신청 테이블에 저장됩니다.
 *
 * * @param hospitalId - 신청 대상 병원의 고유 ID
 * @param languages - 사용자가 선택한 언어 명칭 리스트 (예: ['영어', '일본어'])
 * @returns {Promise<ActionResult<null>>}
 * 성공 시 별도의 반환 데이터 없이 success: true를 리턴합니다.
 */
export async function submitLanguageApplicationAction(
  hospitalId: number,
  languageIds: string[],
): Promise<ActionResult<null>> {
  try {
    const requestLangsInKorean = languageIds.map((id) => NAME_TO_ID[id] || id);
    await prisma.hospitalLanguageApplication.create({
      data: {
        hospitalId,
        requestLangs: requestLangsInKorean,
        status: 'PENDING',
      },
    });

    return { success: true, data: null };
  } catch (err) {
    return handleActionResult(err);
  }
}
