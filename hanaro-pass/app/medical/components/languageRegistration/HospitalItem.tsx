import ActionButton from '@/components/ui/ActionButton';

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
      <div className="mt-4">
        <ActionButton text="이 병원이 맞습니다" onClick={onSelect} />
      </div>
    </div>
  );
}
