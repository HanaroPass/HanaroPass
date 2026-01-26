'use server';

import { unstable_cache } from 'next/cache';
import type { Prisma } from '@/lib/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import {
  type CouponListRequest,
  CouponListRequestSchema,
  type CouponListResponse,
} from './getCouponList.schema';

async function queryCoupons(
  input: CouponListRequest,
): Promise<CouponListResponse[]> {
  const { category, q } = input;

  const where: Prisma.CouponWhereInput = {};
  if (category) where.category = category;
  if (q) {
    where.OR = [
      { brandName: { contains: q } },
      { tag: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const rows = await prisma.coupon.findMany({
    where,
    orderBy: { id: 'asc' },
    select: {
      id: true,
      tag: true,
      discount: true,
      category: true,
      couponCode: true,
      brandName: true,
      brandPic: true,
      description: true,
      latitude: true,
      longitude: true,
    },
  });

  return rows.map((c) => ({
    id: c.id,
    tag: c.tag,
    discount: c.discount,
    category: c.category,
    couponCode: c.couponCode,
    brandName: c.brandName,
    brandPic: c.brandPic,
    description: c.description,
    latitude: c.latitude.toString(),
    longitude: c.longitude.toString(),
  }));
}

function cacheKey(input: CouponListRequest) {
  return `category=${input.category ?? 'ALL'}&q=${input.q ?? ''}`;
}

export async function getCouponsCached(raw: CouponListRequest) {
  const parsed = CouponListRequestSchema.parse(raw);

  const cachedFn = unstable_cache(
    () => queryCoupons(parsed),
    ['coupons:list', cacheKey(parsed)],
    { revalidate: 60, tags: ['coupons:list'] },
  );

  return cachedFn();
}
