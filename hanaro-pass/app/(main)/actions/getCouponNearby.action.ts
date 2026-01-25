'use server';

import { unstable_cache } from 'next/cache';
import { type CouponCategory, Prisma } from '@/lib/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { toNumber } from '@/lib/toNumber';
import {
  type CouponNearbyItem,
  CouponNearbyItemSchema,
  type CouponNearbyRequest,
  CouponNearbyRequestSchema,
} from './getCouponNearby.schema';

function toDistanceLabel(meters: number) {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(2)}km`;
}

function cacheKey(input: CouponNearbyRequest) {
  const latKey = input.lat.toFixed(3);
  const lngKey = input.lng.toFixed(3);
  return `lat=${latKey}&lng=${lngKey}&r=${input.radiusKm}&l=${input.limit}&c=${input.category ?? 'ALL'}&q=${input.q ?? ''}`;
}

/**
 * 1) Bounding box로 후보 줄임
 * 2) Haversine로 distanceMeters 계산
 * 3) distanceMeters ASC 정렬 + limit
 */
async function queryNearbyCoupons(
  parsed: CouponNearbyRequest,
): Promise<CouponNearbyItem[]> {
  const { lat, lng, radiusKm, limit, category, q } = parsed;

  const latDelta = radiusKm / 111.0;
  const lngDelta = radiusKm / (111.0 * Math.cos((lat * Math.PI) / 180));

  const minLat = lat - latDelta;
  const maxLat = lat + latDelta;
  const minLng = lng - lngDelta;
  const maxLng = lng + lngDelta;

  const categoryFilterSafe = category
    ? `AND c.category = ${JSON.stringify(category)}`
    : '';

  const qFilter = q
    ? `AND (
        c.brandName LIKE ${JSON.stringify(`%${q}%`)}
        OR c.tag LIKE ${JSON.stringify(`%${q}%`)}
        OR c.description LIKE ${JSON.stringify(`%${q}%`)}
      )`
    : '';

  const rows = await prisma.$queryRaw<
    {
      id: unknown;
      tag: string | null;
      discount: unknown;
      category: CouponCategory;
      couponCode: string;
      brandName: string;
      brandPic: string;
      description: string;
      latitude: unknown;
      longitude: unknown;
      distanceMeters: unknown;
    }[]
  >(Prisma.sql`
  SELECT
    c.id,
    c.tag,
    c.discount,
    c.category,
    c.couponCode,
    c.brandName,
    c.brandPic,
    c.description,
    c.latitude,
    c.longitude,
    (
      6371000 * ACOS(
        COS(RADIANS(${lat})) * COS(RADIANS(c.latitude)) * COS(RADIANS(c.longitude) - RADIANS(${lng}))
        + SIN(RADIANS(${lat})) * SIN(RADIANS(c.latitude))
      )
    ) AS distanceMeters
  FROM Coupons c
  WHERE
    c.latitude BETWEEN ${minLat} AND ${maxLat}
    AND c.longitude BETWEEN ${minLng} AND ${maxLng}
    ${Prisma.raw(categoryFilterSafe)}
    ${Prisma.raw(qFilter)}
  ORDER BY distanceMeters ASC
  LIMIT ${limit};
`);

  const dto = rows.map((c) => {
    const distanceMeters = toNumber(c.distanceMeters, 'distanceMeters');

    return {
      id: toNumber(c.id, 'id'),
      tag: c.tag ?? null,
      discount: toNumber(c.discount, 'discount'),
      category: c.category,
      couponCode: String(c.couponCode),
      brandName: String(c.brandName),
      brandPic: String(c.brandPic),
      description: String(c.description),

      latitude: String(c.latitude),
      longitude: String(c.longitude),

      distanceMeters,
      distanceLabel: toDistanceLabel(distanceMeters),
    };
  });

  return CouponNearbyItemSchema.array().parse(dto);
}

export async function getCouponNearbyCached(raw: CouponNearbyRequest) {
  const parsed = CouponNearbyRequestSchema.parse(raw);

  const cachedFn = unstable_cache(
    () => queryNearbyCoupons(parsed),
    ['coupons:nearby', cacheKey(parsed)],
    { revalidate: 60, tags: ['coupons:nearby'] },
  );

  return cachedFn();
}
