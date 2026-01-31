'use server';

import { filterHour } from '../utils/filterHour';
import { getFilteredHospitals } from './filterHospital.action';
import { getName } from './getName.action';
import { parseOutput } from './symptoms.action';

export async function getRecommendResult(raw: string) {
  const parsed = await parseOutput(raw);
  const type = parsed.타입;
  const symptom = type === 'SYMPTOM' ? parsed.주요_증상 : parsed.희망_시술;

  const hospitals = await getFilteredHospitals(type, symptom);

  const refined = await Promise.all(
    hospitals.map(async (h) => ({
      ...h,
      departments: h.HospitalDept.map((d) => d.deptName),
      languages: h.HospitalLang.map((l) => l.langName),
      aiSummary: h.HospitalReview?.aiSummary,
      ...filterHour(h.openHours),
    })),
  );
  const user = await getName();

  return { user, symptom, hospitals: refined };
}
