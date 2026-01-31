'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/errorHandler';
import type { Hospital } from '@/lib/generated/prisma';
import { sendApplicationSubmissionEmail } from '@/lib/mail';
import { prisma } from '@/lib/prisma';
import { type LanguageId, mapLanguages } from '../constants/language';
import type { StatusType } from '../constants/statusConfig';
import {
  IdSchema,
  LanguageTransformSchema,
  type RegistrationDetailResponse,
  SubmitSchema,
} from '../schemas/languageRegist.schema';

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
    pendingAppId?: number;
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
      select: { id: true },
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
        pendingAppId: PENDINGApp?.id,
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
  email: string,
): Promise<ActionResult<{ id: number }>> {
  try {
    const {
      hospitalId: vId,
      languageIds: vLangs,
      email: vEmail,
    } = SubmitSchema.parse({
      hospitalId,
      languageIds,
      email,
    });

    const newApp = await prisma.$transaction(async (tx) => {
      const existingPENDING = await tx.hospitalLanguageApplication.findFirst({
        where: {
          hospitalId: vId,
          status: 'PENDING',
        },
      });

      if (existingPENDING) {
        throw new HttpError('이미 심사 중인 신청 건이 존재합니다.', 400);
      }

      return await tx.hospitalLanguageApplication.create({
        data: {
          applicantEmail: vEmail,
          hospitalId: vId,
          requestLangs: vLangs,
          status: 'PENDING',
        },
        include: { Hospital: { select: { nameKo: true } } },
      });
    });

    const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
    if (admins.length > 0) {
      await prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          title: '새로운 병원 언어 등록 신청',
          content: `[${newApp.Hospital.nameKo}] ${vEmail}님의 외국어 등록 신청이 접수되었습니다.`,
          link: `/medical/admin/${newApp.id}`,
        })),
      });
    }

    if (email) {
      try {
        await sendApplicationSubmissionEmail(
          email,
          newApp.Hospital.nameKo,
          newApp.id,
        );
        console.log(`[Submission Email Sent] To: ${email}`);
      } catch (mailError) {
        console.error('[Submission Email Failed]', mailError);
      }
    }

    return { success: true, data: { id: newApp.id } };
  } catch (err) {
    return handleActionResult(err);
  }
}

/**
 * [신청 결과 요약 조회]
 *
 * 완료 페이지에서 신청한 병원명, 신청 시간, 상태를 보여주기 위해 사용
 */
export async function getRegistrationResultAction(id: number): Promise<
  ActionResult<{
    hospitalName: string;
    createdAt: Date;
    status: StatusType;
    applicantEmail: string;
  }>
> {
  try {
    const validatedId = IdSchema.parse(id);

    const application = await prisma.hospitalLanguageApplication.findUnique({
      where: { id: validatedId },
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
        applicantEmail: application.applicantEmail,
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
  id: number,
): Promise<ActionResult<RegistrationDetailResponse>> {
  try {
    const validatedId = IdSchema.parse(id);

    const application = await prisma.hospitalLanguageApplication.findUnique({
      where: { id: validatedId },
      include: {
        Hospital: { select: { nameKo: true } },
      },
    });

    if (!application) {
      throw new HttpError('신청 내역을 찾을 수 없습니다.', 404);
    }

    const history = await prisma.hospitalLanguageApplication.findMany({
      where: {
        hospitalId: application.hospitalId,
        applicantEmail: application.applicantEmail,
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: {
        hospitalId: application.hospitalId,
        applicantEmail: application.applicantEmail,
        hospitalName: application.Hospital.nameKo,
        status: application.status as StatusType,
        requestLangs: mapLanguages(application.requestLangs as string[]),
        createdAt: application.createdAt,
        processedAt: application.processedAt,
        history: history.map((app) => ({
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
