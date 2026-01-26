import { z } from 'zod';
import { CouponCategory } from '@/lib/generated/prisma/client';

export const CouponListRequestSchema = z.object({
  category: z.nativeEnum(CouponCategory).optional(),
  q: z.string().trim().min(1).max(50).optional(),
});

export type CouponListRequest = z.infer<typeof CouponListRequestSchema>;

export type CouponListResponse = {
  id: number;
  tag: string | null;
  discount: number;
  category: CouponCategory;
  couponCode: string;
  brandName: string;
  brandPic: string;
  description: string;
  latitude: string;
  longitude: string;
};

export const CouponTabSchema = z
  .nativeEnum(CouponCategory)
  .or(z.literal('ALL'));
export type CouponTabValue = z.infer<typeof CouponTabSchema>;

export const CouponSearchSchema = z.object({
  category: CouponTabSchema.catch('ALL'),
  q: z.string().trim().optional().catch(''),
});

export type CouponSearchRequest = z.infer<typeof CouponSearchSchema>;
