'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import type { Hospital } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

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

    const hospitals = await prisma.hospital.findMany({
      where: {
        nameKo: { contains: sanitizedQuery },
      },
      select: {
        id: true,
        nameKo: true,
        address: true,
      },
    });

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
): Promise<ActionResult<{ nameKo: string }>> {
  try {
    const hospital = await prisma.hospital.findUnique({
      where: {
        id,
      },
      select: {
        nameKo: true,
      },
    });

    if (!hospital)
      throw new HttpError('해당 ID의 병원을 찾을 수 없습니다.', 404);

    return { success: true, data: hospital };
  } catch (err) {
    return handleActionResult(err);
  }
}
