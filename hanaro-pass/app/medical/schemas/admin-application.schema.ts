import { z } from 'zod';

export const BaseApplicationSchema = z.object({
  id: z.number(),
  hospitalName: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  requestLangs: z.array(z.string()),
  createdAt: z.date(),
});

export const AdminApplicationSchema = BaseApplicationSchema;

export const AdminReviewDetailSchema = BaseApplicationSchema.extend({
  hospitalId: z.number(),
  processedAt: z.date().nullable().optional(),
});

export const AdminDashboardSchema = z.object({
  applications: z.array(AdminApplicationSchema),
  counts: z.object({
    PENDING: z.number(),
    APPROVED: z.number(),
    REJECTED: z.number(),
  }),
});

export const UpdateStatusSchema = z.object({
  id: z.number().int().positive({ message: '유효한 신청 ID가 필요합니다.' }),
  status: z.enum(['APPROVED', 'REJECTED'], {
    message: '승인 또는 반려 상태만 설정 가능합니다.',
  }),
});

export type AdminApplicationItem = z.infer<typeof AdminApplicationSchema>;
export type AdminReviewDetailResponse = z.infer<typeof AdminReviewDetailSchema>;
export type AdminDashboardResponse = z.infer<typeof AdminDashboardSchema>;
export type UpdateStatusRequest = z.infer<typeof UpdateStatusSchema>;
