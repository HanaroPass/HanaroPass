"use client";

import { Star } from "lucide-react";

interface AccountFieldsProps {
  formData: Record<string, string>;
  onFormDataChange: (data: Record<string, string>) => void;
}

interface AccountOptionProps {
  name: string;
  accountNumber: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}

function AccountOption({
  name,
  accountNumber,
  value,
  selected,
  onSelect,
}: AccountOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full rounded-lg border p-4 text-left transition-colors ${
        selected
          ? "border-hana-green bg-green-50"
          : "hover:border-hana-green hover:bg-green-50"
      }`}
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

export function AccountFields({
  formData,
  onFormDataChange,
}: AccountFieldsProps) {
  const handleAccountSelect = (accountValue: string) => {
    onFormDataChange({ ...formData, selectedAccount: accountValue });
  };

  return (
    <div className="space-y-3">
      <AccountOption
        name="영업나블러스 통장"
        accountNumber="211-910776-38107"
        value="account1"
        selected={formData.selectedAccount === "account1"}
        onSelect={handleAccountSelect}
      />
      <AccountOption
        name="자유예금"
        accountNumber="506-910017-92907"
        value="account2"
        selected={formData.selectedAccount === "account2"}
        onSelect={handleAccountSelect}
      />
    </div>
  );
}
