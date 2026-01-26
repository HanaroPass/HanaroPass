'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import type { Hospital } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { validateUser } from '@/lib/user';
import { type LanguageId, mapLanguages } from '../constants/language';
import type { StatusType } from '../constants/statusConfig';
import {
  IdSchema,
  LanguageTransformSchema,
  type RegistrationDetailResponse,
  SubmitSchema,
} from '../schemas/languageRegist.schema';
import { triggerPushNotification } from './push.action';

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
    const sanitizedQuery = query.trim();

    if (!sanitizedQuery || sanitizedQuery.length < 2) {
      return { success: true, data: [] };
    }

    const cleanedQuery = sanitizedQuery.replace(/[+\-><()~*"@]/g, ' ');
    const searchTerms = cleanedQuery
      .split(/\s+/)
      .filter((term) => term.length > 0)
      .map((term) => `+${term}`)
      .join(' ');

    if (!searchTerms) {
      return { success: true, data: [] };
    }

    const hospitals = await prisma.hospital.findMany({
      where: {
        nameKo: {
          search: searchTerms,
        },
      },
      select: {
        id: true,
        nameKo: true,
        address: true,
      },
      take: 20,
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
export async function getHospitalDetailAction(id: number): Promise<
  ActionResult<{
    nameKo: string;
    existingLangs: LanguageId[];
    isPENDING: boolean;
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

    const PENDINGApp = await prisma.hospitalLanguageApplication.findFirst({
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
        isPENDING: !!PENDINGApp,
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

    const session = await getSession();
    const userId = session?.userId;
    if (!userId) {
      throw new HttpError('로그인이 필요한 서비스입니다.', 401);
    }

    await prisma.$transaction(async (tx) => {
      const existingPENDING = await tx.hospitalLanguageApplication.findFirst({
        where: {
          hospitalId: vId,
          status: 'PENDING',
        },
      });

      if (existingPENDING) {
        throw new HttpError('이미 심사 중인 신청 건이 존재합니다.', 400);
      }

      await tx.hospitalLanguageApplication.create({
        data: {
          userId: userId,
          hospitalId: vId,
          requestLangs: vLangs,
          status: 'PENDING',
        },
      });
    });

    const pushTitle = '[하나로패스] 신청 접수 완료';
    const pushBody =
      '외국어 진료 서비스 신청이 정상적으로 접수되었습니다. 심사 결과가 나오면 바로 알려드릴게요!';
    const targetUrl = '/medical/notifications'; // 알림 클릭 시 이동할 곳

    triggerPushNotification(userId, pushTitle, pushBody, targetUrl).catch(
      (err) => console.error('[제출 알림 전송 실패]:', err),
    );
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
    const userId = await validateUser();

    const applications = await prisma.hospitalLanguageApplication.findMany({
      where: { hospitalId: validatedId, userId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        Hospital: { select: { nameKo: true } },
      },
    });

    if (applications.length === 0) {
      throw new HttpError('신청 내역을 찾을 수 없습니다.', 404);
    }

    const latest = applications[0]; // 가장 최근 건

    return {
      success: true,
      data: {
        hospitalName: latest.Hospital.nameKo,
        status: latest.status as StatusType,
        requestLangs: mapLanguages(latest.requestLangs as string[]),
        createdAt: latest.createdAt,
        processedAt: latest.processedAt,
        history: applications.map((app) => ({
          id: app.id,
          status: app.status as StatusType,
          createdAt: app.createdAt,
          processedAt: app.processedAt,
        })),
      },
    };
  } catch (err) {
    return handleActionResult(err);
  }
}
