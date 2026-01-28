'use client';

import Symptom from '../symptom/Symptom';

interface Props {
  user: string;
  symptom: string[] | undefined;
}

export default function SymptomHeader({ user, symptom }: Props) {
  return (
    <>
      <h2 className="font-semibold text-lg">{user} 손님의 맞춤형 병원</h2>
      <p className="text-gray-500 text-sm">외국인 진료가 가능한 병원이에요.</p>
      <div className="h-24 rounded-2xl bg-gray-200">
        <div className="ml-6 pt-5 text-black-800 text-sm">
          {user} 손님의 맞춤형 병원
        </div>
        <div className="mt-2 mb-5 ml-6">
          {symptom?.map((s) => (
            <span key={s}>
              <Symptom value={s} />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
