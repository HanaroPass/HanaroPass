'use server';

import { prisma } from '@/lib/prisma';

export async function getHospitals() {
  const hospitals = await prisma.hospital.findMany({
    include: {
      HospitalDept: {
        select: { deptName: true },
      },
      HospitalLang: {
        select: { langName: true },
      },
      HospitalReview: {
        select: { aiSummary: true, aiSummaryEn: true },
      },
    },
  });

  return hospitals.map((h) => ({
    id: h.id,
    nameKo: h.nameKo,
    nameEn: h.nameEn ?? null,
    address: h.address,
    addressEn: h.addressEn ?? null,
    latitude: Number(h.latitude),
    longitude: Number(h.longitude),
    phone: h.phone,
    openHours: h.openHours,
    imageUrl: h.imageUrl,

    departments: h.HospitalDept.map((d) => d.deptName),
    languages: h.HospitalLang.map((l) => l.langName),
    aiSummary: h.HospitalReview?.aiSummary,
    aiSummaryEn: h.HospitalReview?.aiSummaryEn,
  }));
}
