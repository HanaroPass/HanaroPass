import type React from 'react';

type InfoDetailPlateProps = {
  value: React.ReactNode; // 국기 아이콘 때문에
};

export const InfoDetailPlate = ({ value }: InfoDetailPlateProps) => (
  <div className="mt-1 px-6 py-2">
    <div className="rounded-2xl bg-gray-100/50 p-4 font-sans font-semibold text-(--color-black-900) text-base">
      {value}
    </div>
  </div>
);
