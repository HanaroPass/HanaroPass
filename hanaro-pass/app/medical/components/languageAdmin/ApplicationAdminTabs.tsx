import {
  STATUS_CONFIG,
  type StatusType,
} from '@/app/medical/constants/statusConfig';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TabsProps = {
  activeTab: StatusType;
  onTabChange: (status: StatusType) => void;
  counts: Record<StatusType, number>;
};

export function ApplicationStatusTabs({
  activeTab,
  onTabChange,
  counts,
}: TabsProps) {
  const statusKeys = Object.keys(STATUS_CONFIG) as StatusType[];

  return (
    <nav className="flex w-full border-(--color-border) border-b bg-(--color-white-ez)">
      {statusKeys.map((key) => {
        const config = STATUS_CONFIG[key];
        const isActive = activeTab === key;
        const count = counts[key];

        return (
          <Button
            key={key}
            variant="ghost"
            onClick={() => onTabChange(key)}
            className={cn(
              'relative flex h-14 flex-1 items-center justify-center rounded-none px-0 font-sans transition-all hover:bg-transparent',
              isActive
                ? 'font-bold text-(--color-hana-green)'
                : 'font-medium text-(--color-black-600)',
            )}
          >
            <div className="flex items-center justify-center gap-1">
              <span className="shrink-0 tracking-tight">{config.label}</span>

              {count > 0 && (
                <span
                  className={cn(
                    'flex min-w-5.5 items-center justify-center rounded-full px-1.5 py-0.5 font-bold text-[11px] tabular-nums transition-colors',
                    isActive
                      ? 'bg-(--color-green-300) text-(--color-hana-green)'
                      : 'bg-(--color-gray-100) text-(--color-black-400)',
                  )}
                >
                  {count}
                </span>
              )}
            </div>

            {isActive && (
              <div className="fade-in absolute bottom-0 left-0 h-0.75 w-full animate-in bg-(--color-hana-green) duration-200" />
            )}
          </Button>
        );
      })}
    </nav>
  );
}
