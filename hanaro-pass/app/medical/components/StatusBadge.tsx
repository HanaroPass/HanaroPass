import { STATUS_CONFIG, type StatusType } from '../constants/statusConfig';

export default function StatusBadge({ status }: { status: StatusType }) {
  const { label, badge } = STATUS_CONFIG[status];
  return (
    <div
      className={`flex shrink-0 items-center rounded-full px-3 py-1 ${badge.bg}`}
    >
      <div className={`mr-2 h-2 w-2 rounded-full ${badge.dot}`} />
      <p
        className={`whitespace-nowrap font-medium font-sans text-xs ${badge.text}`}
      >
        {label}
      </p>
    </div>
  );
}
