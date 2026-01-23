import { z } from 'zod';

export const AdminApplicationSchema = z.object({
  id: z.number(),
  hospitalName: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  requestLangs: z.array(z.string()),
  createdAt: z.date(),
});

export const AdminDashboardSchema = z.object({
  applications: z.array(AdminApplicationSchema),
  counts: z.object({
    PENDING: z.number(),
    APPROVED: z.number(),
    REJECTED: z.number(),
  }),
});

export type AdminDashboardResponse = z.infer<typeof AdminDashboardSchema>;
export type AdminApplicationItem = z.infer<typeof AdminApplicationSchema>;
