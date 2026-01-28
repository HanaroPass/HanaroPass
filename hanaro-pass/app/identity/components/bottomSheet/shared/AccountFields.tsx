'use client';

import { Star } from 'lucide-react';

type AccountFieldsProps = {
  onAccountSelect?: (accountData: Record<string, string>) => void;
};

type AccountOptionProps = {
  name: string;
  accountNumber: string;
  value: string;
  onSelect: (accountData: Record<string, string>) => void;
};

function AccountOption({
  name,
  accountNumber,
  value,
  onSelect,
}: AccountOptionProps) {
  const handleSelect = () => {
    onSelect({
      selectedAccount: value,
      accountName: name,
      accountNumber: accountNumber,
      account: `${name} (${accountNumber})`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      className="w-full rounded-lg border p-4 text-left transition-colors hover:border-hana-green hover:bg-green-50"
    >
      <div className="flex items-center gap-2">
        <Star
          className="h-4 w-4 fill-hana-green text-hana-green"
          strokeWidth={0.1}
        />
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-gray-500 text-xs">{accountNumber}</div>
        </div>
      </div>
    </button>
  );
}

export function AccountFields({ onAccountSelect }: AccountFieldsProps) {
  const handleAccountSelect = (accountData: Record<string, string>) => {
    onAccountSelect?.(accountData);
  };

  return (
    <div className="space-y-3">
      <AccountOption
        name="영업나블러스 통장"
        accountNumber="211-910776-38107"
        value="account1"
        onSelect={handleAccountSelect}
      />
      <AccountOption
        name="자유예금"
        accountNumber="506-910017-92907"
        value="account2"
        onSelect={handleAccountSelect}
      />
    </div>
  );
}
