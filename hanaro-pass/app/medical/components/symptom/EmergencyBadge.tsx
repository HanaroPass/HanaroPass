import { CircleAlert } from 'lucide-react';

export const emergencyConfig = {
  낮음: { color: 'bg-green-50 text-green-900' },
  중간: { color: 'bg-yellow-100 text-yellow-900' },
  높음: { color: 'bg-red-100 text-red-900' },
  '매우 높음': { color: 'bg-red-500' },
};

export default function EmergencyBadge({
  value,
}: {
  value: '낮음' | '중간' | '높음' | '매우 높음';
}) {
  const { color } = emergencyConfig[value];
  return (
    <div
      className={`${color} mx-1 inline-flex h-7 items-center rounded-full border px-3 font-medium`}
    >
      <CircleAlert className="mr-1 h-4 w-4 bg-red-" />
      <span>{value}</span>
    </div>
  );
}
