import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const STATUS_CONFIG = {
  pending: {
    label: '대기중',
    badge: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      dot: 'bg-yellow-500',
    },
    alert: {
      bg: 'bg-yellow-50',
      title: 'text-yellow-900',
      desc: 'text-yellow-700',
      iconColor: 'text-yellow-600',
    },
    Icon: Clock,
    message: '관리자가 확인 중입니다. 승인까지 1-2 영업일이 소요됩니다.',
  },
  approved: {
    label: '승인완료',
    badge: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
    },
    alert: {
      bg: 'bg-green-50',
      title: 'text-green-900',
      desc: 'text-green-700',
      iconColor: 'text-green-600',
    },
    Icon: CheckCircle2,
    message:
      '승인이 완료되었습니다. 이제 외국인 환자가 병원 정보를 확인할 수 있습니다.',
  },
  rejected: {
    label: '반려됨',
    badge: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-500',
    },
    alert: {
      bg: 'bg-red-50',
      title: 'text-red-900',
      desc: 'text-red-700',
      iconColor: 'text-red-600',
    },
    Icon: AlertCircle,
    message: '정보가 반려되었습니다. 사유 확인 후 다시 신청해주세요.',
  },
} as const;

export type StatusType = keyof typeof STATUS_CONFIG;
