'use server';

import { type ActionResult, handleActionResult } from '@/lib/error-handler';
import type { Hospital } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

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
