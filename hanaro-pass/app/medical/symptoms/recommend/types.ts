import type { Hospital } from '@/lib/generated/prisma';

export type HospitalWithStatus = Omit<Hospital, 'latitude' | 'longitude'> & {
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  status: '진료 중' | '진료 종료';
  departments: string[];
  languages: string[];
  aiSummary: string | null;
  distance?: number;
};
