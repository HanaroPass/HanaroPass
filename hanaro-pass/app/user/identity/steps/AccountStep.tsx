'use client';

import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { AccountDrawer } from '@/app/user/identity/components/bottomsheet/AccountDrawer';
import Header from '@/components/header/Header';
import ActionButton from '@/components/ui/ActionButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type AccountStepProps = {
  onSubmit: (data: Record<string, string>) => void;
  onClose: () => void;
};

export default function AccountStep({ onSubmit, onClose }: AccountStepProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const handleDrawerSubmit = (data: Record<string, string>) => {
    // 실제 계좌번호나 계좌명을 저장
    const accountInfo =
      data.accountNumber ||
      data.accountName ||
      data.account ||
      '하나은행 1234-567890-123';
    setSelectedAccount(accountInfo);
    setIsDrawerOpen(false); // 바텀시트 닫기
  };

  const handleAccountSelect = () => {
    setIsDrawerOpen(true);
  };

  const handleConfirm = () => {
    if (selectedAccount) {
      onSubmit({ bank: '하나은행', account: selectedAccount });
    }
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

      <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white p-6 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          <div className="mb-8">
            <h2 className="mb-2 font-medium text-gray-800 text-xl">
              계좌번호및후대표 본인인증 확인합니다
            </h2>
            <p className="text-gray-600 text-sm">
              계좌번호 입력 후, 하단의 '내통장 누르시고 비밀번호를 입력해
              주세요.
            </p>
          </div>

          <div className="mb-6">
            <Label className="mb-3 block font-Regular text-base text-gray-600">
              은행 선택
            </Label>

            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
              <span className="font-Regular text-gray-600">하나</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <Label className="mb-3 block font-Regular text-base text-gray-600">
              하나은행 계좌번호
            </Label>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-gray-200 p-4 text-left hover:bg-gray-50"
              onClick={handleAccountSelect}
            >
              <span
                className={
                  selectedAccount
                    ? 'font-medium text-gray-800'
                    : 'text-gray-600'
                }
              >
                {selectedAccount || '하나은행 계좌를 선택하세요.'}
              </span>
              <ChevronDown size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="mt-auto">
            <ActionButton
              text="확인"
              onClick={handleConfirm}
              className={
                selectedAccount
                  ? 'bg-green-ez text-white hover:bg-green-ez/90'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500'
              }
              disabled={!selectedAccount}
            />
          </div>
        </div>
      </div>

      <AccountDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSubmit={handleDrawerSubmit}
      />
    </>
  );
}
