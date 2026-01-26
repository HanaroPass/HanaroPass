'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import EmptyIdentityCard from '../components/EmptyIdentityCard';
import MobileQr from '../components/MobileQr';
import type { IdentityType } from '../hooks/useFunnel';
import { getIdentityData } from '../actions/identity';

const DEFAULT_TAB: 'passport' | 'alien' = 'alien';

type ResultStepProps = {
  identityType: IdentityType | null;
  identityData: Record<string, string> | null;
  onClose: () => void;
  onRegister?: (type: IdentityType) => void;
};

export default function ResultStep({
  identityType,
  identityData: initialData,
  onClose,
  onRegister,
}: ResultStepProps) {
  const [activeTab, setActiveTab] = useState<'passport' | 'alien'>(
    identityType || DEFAULT_TAB,
  );
  const [passportData, setPassportData] = useState<Record<
    string,
    string
  > | null>(null);
  const [alienData, setAlienData] = useState<Record<string, string> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getIdentityData();

        if (!mounted) return;

        setPassportData(res.passport);
        setAlienData(res.alien);

        if (!identityType) {
          if (res.passport) setActiveTab('passport');
          else if (res.alien) setActiveTab('alien');
        }
      } catch (error) {
        console.error('Failed to fetch identity data:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [identityType]);

  const handleRegister = (type: IdentityType) => {
    onRegister?.(type);
  };

  // 현재 탭에 표시할 데이터
  const currentDisplayData = useMemo(() => {
    if (activeTab === identityType) return initialData;
    return activeTab === 'passport' ? passportData : alienData;
  }, [activeTab, identityType, initialData, passportData, alienData]);

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
          {(['passport', 'alien'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative rounded-full px-4 py-1.5 font-medium text-sm transition-all ${
                activeTab === tab
                  ? 'bg-black-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'passport' ? '여권' : '신분증'}
            </button>
          ))}
        </div>
      </Header>

      <div className="flex h-[calc(100dvh-60px)] flex-col overflow-hidden bg-white p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-full w-full max-w-sm flex-col sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              로딩 중...
            </div>
          ) : currentDisplayData ? (
            <div className="flex h-full flex-col">
              <MobileQr type={activeTab} data={currentDisplayData} />
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <EmptyIdentityCard
                type={activeTab}
                onRegister={() => handleRegister(activeTab)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
