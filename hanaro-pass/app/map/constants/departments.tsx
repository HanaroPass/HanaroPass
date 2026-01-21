export const DEPARTMENTS = [
  "내과",
  "소아과",
  "피부과",
  "이비인후과",
  "정형외과",
  "외과",
  "가정의학과",
  "신경외과",
  "마취통증과",
  "성형외과",
  "산부인과",
  "안과",
  "정신건강의학과",
  "비뇨의학과",
  "신경과",
  "재활의학과",
  "흉부외과",
  "영상의학과",
  "치과",
  "한의원",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
