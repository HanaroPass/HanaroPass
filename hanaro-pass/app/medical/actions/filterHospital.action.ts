'use server';

import type { Hospital } from '@/lib/generated/prisma';
import { prisma } from '@/lib/prisma';

export async function getFilteredHospitals(
  type: 'SYMPTOM' | 'PROCEDURE',
  symptom: string[] | undefined,
) {
  let hospitals: (Hospital & {
    HospitalDept: { deptName: string }[];
    HospitalLang: { langName: string }[];
    HospitalReview: { aiSummary: string } | null;
  })[];
  if (type === 'PROCEDURE') {
    hospitals = await prisma.hospital.findMany({
      where: {
        HospitalDept: {
          some: {
            deptName: '성형외과',
          },
        },
      },
      include: {
        HospitalDept: { select: { deptName: true } },
        HospitalLang: { select: { langName: true } },
        HospitalReview: { select: { aiSummary: true } },
      },
    });
  } else {
    if (!symptom || symptom.every((s) => !s.trim())) {
      hospitals = await prisma.hospital.findMany({
        where: {
          HospitalDept: {
            none: {
              deptName: '성형외과',
            },
          },
        },
        include: {
          HospitalDept: { select: { deptName: true } },
          HospitalLang: { select: { langName: true } },
          HospitalReview: { select: { aiSummary: true } },
        },
      });
    } else {
      const symptomMapping = await prisma.symptomMapping.findMany({
        select: { deptName: true },
        where: {
          keyword: {
            in: symptom,
          },
        },
      });

      const depts = symptomMapping
        .flatMap((row) => row.deptName.split(','))
        .map((d) => d.trim());

      hospitals = await prisma.hospital.findMany({
        where: {
          HospitalDept: {
            some: {
              deptName: { in: depts },
            },
          },
        },
        include: {
          HospitalDept: { select: { deptName: true } },
          HospitalLang: { select: { langName: true } },
          HospitalReview: { select: { aiSummary: true } },
        },
      });
    }
  }

  const serialized = hospitals.map((h) => ({
    ...h,
    latitude: Number(h.latitude),
    longitude: Number(h.longitude),
  }));

  return serialized;
}
