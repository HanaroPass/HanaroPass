import { SYMPTOMMAPPING_DATA } from '@/app/medical/constants/symptomMapping';
import { prisma } from '@/lib/prisma';

export default async function seedSymptomMapping() {
  console.log('[SymptomMapping 데이터 생성 시작]');
  await prisma.symptomMapping.createMany({ data: SYMPTOMMAPPING_DATA });
  console.log('[SymptomMapping 데이터 생성 완료]');
}
