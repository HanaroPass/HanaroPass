type StatusBadgeProps = {
  status: 'pending' | 'approved' | 'rejected';
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    pending: {
      label: '승인 대기중',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      dot: 'bg-yellow-500',
    },
    approved: {
      label: '승인 완료',
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
    },
    rejected: {
      label: '반려됨',
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-500',
    },
  };

  const { label, bg, text, dot } = config[status];

  return (
    <div className={`flex items-center rounded-full px-3 py-1 ${bg}`}>
      <div className={`mr-2 h-2 w-2 rounded-full ${dot}`} />
      <p className={`font-medium font-sans text-xs ${text}`}>{label}</p>
    </div>
  );
}
