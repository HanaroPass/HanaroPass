'use client';

import StatusBadge from '@/app/medical/components/StatusBadge';
import {
  STATUS_CONFIG,
  type StatusType,
} from '@/app/medical/constants/statusConfig';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type ApplicationStatusAlertProps = {
  status: StatusType;
  isAdmin?: boolean;
};

export const ApplicationStatusAlert = ({
  status,
  isAdmin = false,
}: ApplicationStatusAlertProps) => {
  const config = STATUS_CONFIG[status];
  const { Icon, alert, message, label } = config;

  return (
    <div className="mt-4 px-6">
      <Alert className={cn('relative rounded-2xl border-none p-5', alert.bg)}>
        <div className="flex items-center gap-2 pr-24">
          <Icon className={cn('h-4 w-5 shrink-0', alert.iconColor)} />
          <span
            className={cn(
              'whitespace-nowrap font-bold font-hana text-base',
              alert.title,
            )}
          >
            현재 상태: {label}
          </span>
        </div>

        <div className="absolute top-5 right-5 flex-none">
          <StatusBadge status={status} />
        </div>

        <AlertDescription
          className={cn(
            'mt-7 pr-2 font-sans text-sm leading-relaxed',
            alert.desc,
          )}
        >
          {!isAdmin && message}
        </AlertDescription>
      </Alert>
    </div>
  );
};
