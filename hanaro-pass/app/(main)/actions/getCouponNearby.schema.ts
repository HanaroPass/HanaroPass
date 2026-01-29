import { z } from 'zod';
import { CouponCategory } from '@/lib/generated/prisma/client';

export const CouponNearbyRequestSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radiusKm: z.coerce.number().min(0.1).max(50).default(2),
  limit: z.coerce.number().int().min(1).max(50).default(10),

  category: z.nativeEnum(CouponCategory).optional(),
  q: z.string().trim().min(1).max(50).optional(),
});

export type CouponNearbyRequest = z.infer<typeof CouponNearbyRequestSchema>;

export const CouponNearbyItemSchema = z.object({
  id: z.number().int(),
  tag: z.string().nullable(),
  discount: z.number().int(),
  category: z.nativeEnum(CouponCategory),
  couponCode: z.string(),
  brandName: z.string(),
  brandPic: z.string(),
  description: z.string(),

  latitude: z.string(),
  longitude: z.string(),

  distanceMeters: z.number().nonnegative(),
  distanceLabel: z.string(),
});

export type CouponNearbyItem = z.infer<typeof CouponNearbyItemSchema>;
