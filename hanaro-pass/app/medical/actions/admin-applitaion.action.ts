'use server';

import {
  type ActionResult,
  HttpError,
  handleActionResult,
} from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import type { StatusType } from '../constants/statusConfig';
import {
  type AdminDashboardResponse,
  AdminDashboardSchema,
  type AdminReviewDetailResponse,
  AdminReviewDetailSchema,
} from '../schemas/admin-application.schema';

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
      requestLangs: app.requestLangs,
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
      requestLangs: application.requestLangs,
      createdAt: application.createdAt,
      processedAt: application.processedAt,
    };

    return { success: true, data: AdminReviewDetailSchema.parse(result) };
  } catch (err) {
    return handleActionResult(err);
  }
}
