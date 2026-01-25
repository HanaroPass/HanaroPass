'use server';

import { prisma } from '@/lib/prisma';

export async function getFilteredHospitals(
  type: 'SYMPTOM' | 'PROCEDURE',
  symptom: string[] | undefined,
) {
  if (type === 'PROCEDURE')
    return await prisma.hospital.findMany({
      where: {
        HospitalDept: {
          every: {
            deptName: '성형외과',
          },
        },
      },
    });

  if (!symptom || symptom.length === 0)
    return await prisma.hospital.findMany({
      where: {
        HospitalDept: {
          none: {
            deptName: '성형외과',
          },
        },
      },
    });

  const symptomMapping = await prisma.symptomMapping.findMany({
    select: { deptName: true },
    where: {
      keyword: {
        in: symptom,
      },
    },
  });

  const depts = symptomMapping.map((d) => d.deptName);

  return await prisma.hospital.findMany({
    where: {
      HospitalDept: {
        some: {
          deptName: { in: depts },
        },
      },
    },
  });
}
