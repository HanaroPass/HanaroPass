export type HospitalWithStatus = {
  id: number;
  nameKo: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  openHours: string;
  imageUrl: string | null;
  openTime: string;
  closeTime: string;
  status: '진료 중' | '진료 종료';
  departments: string[];
  languages: string[];
  aiSummary?: string;
  distance?: number;
};

export type outputType = {
  타입: 'SYMPTOM' | 'PROCEDURE';
  주요_증상?: string[];
  발생_시점?: string;
  희망_시술?: string[];
  요청_사유?: string[];
  응급_여부: '낮음' | '중간' | '높음' | '매우 높음';
  번역_내용: string;
  재출력: string;
};
