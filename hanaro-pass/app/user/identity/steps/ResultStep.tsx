'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import EmptyIdentityCard from '../components/EmptyIdentityCard';
import type { IdentityType } from '../hooks/useFunnel';

type ResultStepProps = {
  identityType: IdentityType | null;
  identityData: Record<string, string> | null;
  accountData: Record<string, string> | null;
  onClose: () => void;
  onRegister?: (type: IdentityType) => void;
};

export default function ResultStep({
  identityType,
  identityData,
  accountData,
  onClose,
  onRegister,
}: ResultStepProps) {
  const [activeTab, setActiveTab] = useState(
    identityType === 'passport' ? 'passport' : 'alien',
  );

  const handleRegister = (type: IdentityType) => {
    if (onRegister) {
      onRegister(type);
    }
  };

  return (
    <>
      <Header
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
      >
        <div className="flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('passport')}
            className={`relative rounded-full px-4 py-1.5 font-medium text-sm transition-all ${
              activeTab === 'passport'
                ? 'bg-black-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            여권
          </button>
          <button
            onClick={() => setActiveTab('alien')}
            className={`relative rounded-full px-4 py-1.5 font-medium text-sm transition-all ${
              activeTab === 'alien'
                ? 'bg-black-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            신분증
          </button>
        </div>
      </Header>

      <div className="flex h-[calc(100dvh-60px)] flex-col overflow-hidden bg-white p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-full w-full max-w-sm flex-col sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          {activeTab === 'passport' ? (
            <div className="flex h-full flex-col">
              {identityType === 'passport' && identityData ? (
                <>
                  <div className="space-y-3">
                    {Object.entries(identityData).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b pb-2"
                      >
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-800">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {accountData && (
                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-3 font-semibold text-base">
                        연동 계좌
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(accountData).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">{key}</span>
                            <span className="font-medium text-gray-800 text-sm">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <EmptyIdentityCard
                  type="passport"
                  onRegister={() => handleRegister('passport')}
                />
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col">
              {identityType === 'alien' && identityData ? (
                <>
                  <div className="space-y-3">
                    {Object.entries(identityData).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b pb-2"
                      >
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-800">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {accountData && (
                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                      <h4 className="mb-3 font-semibold text-base">
                        연동 계좌
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(accountData).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">{key}</span>
                            <span className="font-medium text-gray-800 text-sm">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <EmptyIdentityCard
                  type="alien"
                  onRegister={() => handleRegister('alien')}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
