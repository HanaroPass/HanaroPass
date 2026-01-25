'use server';

import { z } from 'zod';
import type { CouponCategory } from '@/constants/couponCategory';
import { prisma } from '@/lib/prisma';

const CouponDetailRequest = z.object({
  id: z.union([z.string(), z.number()]),
});

export type CouponDetailResponse = {
  id: number;
  tag: string | null;
  discount: number;
  category: CouponCategory;
  couponCode: string;
  brandName: string;
  brandPic: string;
  latitude: string;
  longitude: string;
  description: string;
};

export async function getCouponById(
  input: z.infer<typeof CouponDetailRequest>,
): Promise<CouponDetailResponse> {
  const parsed = CouponDetailRequest.parse(input);

  const id =
    typeof parsed.id === 'string' ? Number.parseInt(parsed.id, 10) : parsed.id;

  if (!Number.isFinite(id) || id <= 0) {
    throw new Error('Invalid coupon id');
  }

  const coupon = await prisma.coupon.findUnique({
    where: { id },
    select: {
      id: true,
      tag: true,
      discount: true,
      category: true,
      couponCode: true,
      brandName: true,
      brandPic: true,
      latitude: true,
      longitude: true,
      description: true,
    },
  });

  if (!coupon) {
    throw new Error('Coupon not found');
  }

  return {
    id: coupon.id,
    tag: coupon.tag,
    discount: coupon.discount,
    category: coupon.category,
    couponCode: coupon.couponCode,
    brandName: coupon.brandName,
    brandPic: coupon.brandPic,
    latitude: coupon.latitude.toString(),
    longitude: coupon.longitude.toString(),
    description: coupon.description,
  };
}
