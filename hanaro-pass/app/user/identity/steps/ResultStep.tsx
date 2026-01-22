'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ResultStepProps = {
  identityType: 'passport' | 'alien' | null;
  identityData: Record<string, string> | null;
  accountData: Record<string, string> | null;
  onClose: () => void;
};

export default function ResultStep({
  identityType,
  identityData,
  accountData,
  onClose,
}: ResultStepProps) {
  const [activeTab, setActiveTab] = useState(
    identityType === 'passport' ? 'passport' : 'alien',
  );

  // 탭에 따른 헤더 제목 동적 변경
  const getHeaderTitle = () => {
    return activeTab === 'passport' ? '모바일 여권' : '모바일 신분증';
  };

  return (
    <>
      <Header
        title={getHeaderTitle()}
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
        <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="passport">모바일 여권</TabsTrigger>
              <TabsTrigger value="alien">모바일 신분증</TabsTrigger>
            </TabsList>

            <TabsContent value="passport" className="mt-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-semibold text-lg">여권 정보</h3>
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
                              <span className="text-gray-600 text-sm">
                                {key}
                              </span>
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
                  <p className="text-center text-gray-500">
                    등록된 여권 정보가 없습니다.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="alien" className="mt-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-semibold text-lg">
                  외국인등록증 정보
                </h3>
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
                              <span className="text-gray-600 text-sm">
                                {key}
                              </span>
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
                  <p className="text-center text-gray-500">
                    등록된 신분증 정보가 없습니다.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
