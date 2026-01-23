'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import type { Hospital } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import type { LanguageId } from '../constants/language';
import type { StatusType } from '../constants/statusConfig';
import {
  IdSchema,
  LanguageTransformSchema,
  type RegistrationDetailResponse,
  SearchSchema,
  SubmitSchema,
} from '../schemas/language-regist.schema';

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
    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      return { success: true, data: [] };
    }
    const validatedQuery = SearchSchema.parse(sanitizedQuery);

    const hospitals = await prisma.$queryRaw<
      Pick<Hospital, 'id' | 'nameKo' | 'address'>[]
    >`
  SELECT id, nameKo, address 
  FROM Hospital 
  WHERE REPLACE(nameKo, ' ', '') LIKE ${`%${validatedQuery}%`}
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
export async function getHospitalDetailAction(id: number): Promise<
  ActionResult<{
    nameKo: string;
    existingLangs: LanguageId[];
    isPending: boolean;
  }>
> {
  try {
    const validatedId = IdSchema.parse(id);
    const hospital = await prisma.hospital.findUnique({
      where: {
        id: validatedId,
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
        hospitalId: validatedId,
        status: 'PENDING',
      },
    });

    const validatedLangs = LanguageTransformSchema.parse(
      hospital.HospitalLang.map((hl) => hl.langName),
    );

    return {
      success: true,
      data: {
        nameKo: hospital.nameKo,
        existingLangs: validatedLangs,
        isPending: !!pendingApp,
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
    const { hospitalId: vId, languageIds: vLangs } = SubmitSchema.parse({
      hospitalId,
      languageIds,
    });

    await prisma.$transaction(async (tx) => {
      const existingPending = await tx.hospitalLanguageApplication.findFirst({
        where: {
          hospitalId: vId,
          status: 'PENDING',
        },
      });

      if (existingPending) {
        throw new HttpError('이미 심사 중인 신청 건이 존재합니다.', 400);
      }

      await tx.hospitalLanguageApplication.create({
        data: {
          hospitalId: vId,
          requestLangs: vLangs,
          status: 'PENDING',
        },
      });
    });
    return { success: true, data: null };
  } catch (err) {
    return handleActionResult(err);
  }
}

/**
 * [신청 결과 요약 조회]
 *
 * 완료 페이지에서 신청한 병원명, 신청 시간, 상태를 보여주기 위해 사용
 */
export async function getRegistrationResultAction(
  hospitalId: number,
): Promise<
  ActionResult<{ hospitalName: string; createdAt: Date; status: StatusType }>
> {
  try {
    const validatedId = IdSchema.parse(hospitalId);

    const application = await prisma.hospitalLanguageApplication.findFirst({
      where: { hospitalId: validatedId },
      orderBy: { createdAt: 'desc' },
      include: {
        Hospital: {
          select: { nameKo: true },
        },
      },
    });

    if (!application) {
      throw new HttpError('신청 내역을 찾을 수 없습니다.', 404);
    }

    return {
      success: true,
      data: {
        hospitalName: application.Hospital.nameKo,
        createdAt: application.createdAt,
        status: application.status as StatusType,
      },
    };
  } catch (err) {
    return handleActionResult(err);
  }
}

/**
 * 신청 내역 상세 조회
 *
 * 신청 내역 상세 페이지에서 신청한 병원명, 신청 시간, 상태, 요청 언어 리스트를 보여주기 위해 사용
 */
export async function getRegistrationDetailAction(
  hospitalId: number,
): Promise<ActionResult<RegistrationDetailResponse>> {
  try {
    const validatedId = IdSchema.parse(hospitalId);

    const application = await prisma.hospitalLanguageApplication.findFirst({
      where: { hospitalId: validatedId },
      orderBy: { createdAt: 'desc' },
      include: {
        Hospital: { select: { nameKo: true } },
      },
    });

    if (!application) {
      throw new HttpError('신청 내역을 찾을 수 없습니다.', 404);
    }

    return {
      success: true,
      data: {
        hospitalName: application.Hospital.nameKo,
        status: application.status as StatusType,
        requestLangs: application.requestLangs as LanguageId[], // Json 타입을 LanguageId[]로 간주
        createdAt: application.createdAt,
        processedAt: application.processedAt,
      },
    };
  } catch (err) {
    return handleActionResult(err);
  }
}
