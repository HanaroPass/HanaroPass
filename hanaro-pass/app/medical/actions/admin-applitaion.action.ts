'use server';

import { type ActionResult, handleActionResult } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import type { StatusType } from '../constants/statusConfig';
import {
  type AdminDashboardResponse,
  AdminDashboardSchema,
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
