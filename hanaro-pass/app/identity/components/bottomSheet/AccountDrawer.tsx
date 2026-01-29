'use client';

import { AccountFields } from './shared/AccountFields';
import { BaseDrawer } from './shared/BaseDrawer';

type AccountDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
};

export function AccountDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: AccountDrawerProps) {
  const handleAccountSelect = (accountData: Record<string, string>) => {
    onSubmit?.(accountData);
    onOpenChange(false);
  };

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="출입계좌 선택"
      onReset={() => {}}
      className={className}
      showButtons={false}
    >
      <AccountFields onAccountSelect={handleAccountSelect} />
    </BaseDrawer>
  );
}
