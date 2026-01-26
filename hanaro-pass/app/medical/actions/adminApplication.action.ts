'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { validateAdmin } from '@/lib/user';
import { LANGUAGES, mapLanguages } from '../constants/language';
import type { StatusType } from '../constants/statusConfig';
import {
  type AdminDashboardResponse,
  AdminDashboardSchema,
  type AdminReviewDetailResponse,
  AdminReviewDetailSchema,
  UpdateStatusSchema,
} from '../schemas/adminApplication.schema';
import { triggerPushNotification } from './push.action';

/**
 * [관리자 대시보드 데이터 조회]
 *
 * * 모든 병원의 외국어 진료 신청 내역과 상태별 통계 개수를 조회합니다.
 * @returns {Promise<ActionResult<AdminDashboardResponse>>}
 * 성공 시 전체 신청 리스트와 상태별 카운트 데이터를 반환합니다.
 */
export async function getAdminApplicationsAction(): Promise<
  ActionResult<AdminDashboardResponse>
> {
  try {
    await validateAdmin();

    const apps = await prisma.hospitalLanguageApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        Hospital: { select: { nameKo: true } },
      },
    });

    const applications = apps.map((app) => ({
      id: app.id,
      hospitalName: app.Hospital.nameKo,
      status: app.status as StatusType,
      requestLangs: mapLanguages(app.requestLangs as string[]),
      createdAt: app.createdAt,
    }));

    const counts = {
      PENDING: applications.filter((a) => a.status === 'PENDING').length,
      APPROVED: applications.filter((a) => a.status === 'APPROVED').length,
      REJECTED: applications.filter((a) => a.status === 'REJECTED').length,
    };

    const result = { applications, counts };

    return {
      success: true,
      data: AdminDashboardSchema.parse(result),
    };
  } catch (err) {
    return handleActionResult(err);
  }
}

/**
 * [심사 상세 정보 조회]
 *
 * @param id - 조회할 신청 내역의 고유 아이디
 * @returns {Promise<ActionResult<AdminReviewDetailResponse>>}
 * @throws {HttpError} 신청 내역이 존재하지 않을 경우 404 에러 발생
 */
export async function getAdminReviewDetailAction(
  id: number,
): Promise<ActionResult<AdminReviewDetailResponse>> {
  try {
    await validateAdmin();

    const application = await prisma.hospitalLanguageApplication.findUnique({
      where: { id },
      include: { Hospital: { select: { nameKo: true } } },
    });

    if (!application) throw new HttpError('신청 내역을 찾을 수 없습니다.', 404);

    const result = {
      id: application.id,
      hospitalId: application.hospitalId,
      hospitalName: application.Hospital.nameKo,
      status: application.status,
      requestLangs: mapLanguages(application.requestLangs as string[]),
      createdAt: application.createdAt,
      processedAt: application.processedAt,
    };

    return { success: true, data: AdminReviewDetailSchema.parse(result) };
  } catch (err) {
    return handleActionResult(err);
  }
}

/**
 *
 * @param id 상태를 변경할 신청 내역의 고유 ID
 * @param status 변경할 목표 상태 ('APPROVED' | 'REJECTED')
 * @returns {Promise<ActionResult<null>>} 성공 시 success: true를 반환
 * @throws {HttpError} 유효하지 않은 신청 ID이거나 이미 처리된 신청일 경우 에러 발생
 *
 * 400 : 신청 건이 'PENDING' 상태가 아니거나 처리 가능한 대상이 아닐 경우
 * 404 : 해당 ID의 신청 내역을 찾을 수 없는 경우
 */
export async function updateApplicationStatusAction(
  id: number,
  status: 'APPROVED' | 'REJECTED',
): Promise<ActionResult<null>> {
  try {
    await validateAdmin();

    const { id: vId, status: vStatus } = UpdateStatusSchema.parse({
      id,
      status,
    });

    await prisma.$transaction(async (tx) => {
      const app = await tx.hospitalLanguageApplication.findUnique({
        where: { id: vId },
        include: {
          Hospital: { select: { nameKo: true } },
        },
      });
      if (!app) throw new HttpError('처리 가능한 신청 내역이 아닙니다.', 400);

      const updated = await tx.hospitalLanguageApplication.updateMany({
        where: { id: vId, status: 'PENDING' },
        data: { status: vStatus, processedAt: new Date() },
      });
      if (updated.count === 0)
        throw new HttpError('처리 가능한 신청 내역이 아닙니다.', 400);

      if (vStatus === 'APPROVED') {
        const langIds = app.requestLangs as string[];
        const langNames = langIds
          .map((langId) => LANGUAGES.find((l) => l.id === langId)?.name)
          .filter(Boolean);

        await tx.hospitalLang.deleteMany({
          where: { hospitalId: app.hospitalId },
        });
        await tx.hospitalLang.createMany({
          data: langNames.map((name) => ({
            hospitalId: app.hospitalId,
            langName: name as string,
          })),
        });
      }

      const pushTitle = '[하나로패스] 신청 심사 결과 안내';
      const pushBody =
        vStatus === 'APPROVED'
          ? `축하합니다! ${app.Hospital.nameKo}의 신청이 승인되었습니다. `
          : `안타깝게도 ${app.Hospital.nameKo}의 신청이 반려되었습니다.`;

      const targetUrl = `/medical/registrations/${app.hospitalId}`; // 알림 클릭 시 이동할 페이지

      triggerPushNotification(app.userId, pushTitle, pushBody, targetUrl).catch(
        (err) => console.error('[알림 오류]:', err),
      );
    });

    return { success: true, data: null };
  } catch (err) {
    return handleActionResult(err);
  }
}
