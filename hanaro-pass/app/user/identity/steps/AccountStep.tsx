'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { AccountDrawer } from '@/app/user/identity/components/bottomsheet/AccountDrawer';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';

type AccountStepProps = {
  onSubmit: (data: Record<string, string>) => void;
  onClose: () => void;
};

export default function AccountStep({ onSubmit, onClose }: AccountStepProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleSubmit = (data: Record<string, string>) => {
    console.log('계좌 정보:', data);
    onSubmit(data);
  };

  return (
    <>
      <Header
        title="하나인증서"
        rightElement={
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="p-2 text-black-900 transition-opacity active:opacity-50"
            aria-label="닫기"
          >
            <X size={24} />
          </Button>
        }
      />

      <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          <div className="mb-8">
            <h2 className="font-semibold text-gray-800 text-xl">
              출입계좌를 선택해주세요
            </h2>
          </div>
        </div>
      </div>

      <AccountDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
