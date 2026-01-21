type HospitalItemProps = {
  name: string;
  address: string;
  onSelect: () => void;
};

export default function HospitalItem({
  name,
  address,
  onSelect,
}: HospitalItemProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <p className="font-sans font-semibold text-base text-primary">{name}</p>
      <p className="mt-1 font-sans text-black-800 text-sm">{address}</p>
      {/* 확인 버튼: bg-green-ez 브랜드 컬러 적용 */}
      <button
        type="button"
        onClick={onSelect}
        className="mt-4 w-full rounded-md bg-green-ez py-2 font-medium font-sans text-sm text-white transition-opacity active:opacity-90"
      >
        이 병원이 맞습니다
      </button>
    </div>
  );
}
