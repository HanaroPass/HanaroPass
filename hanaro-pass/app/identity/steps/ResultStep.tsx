'use client';

import { Loader2, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { getIdentityData } from '../actions/identity';
import EmptyIdentityCard from '../components/EmptyIdentityCard';
import MobileQr from '../components/MobileQr';
import type { IdentityType } from '../IdentityPageClient';

const DEFAULT_TAB: 'passport' | 'arc' = 'arc';

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
  const { registerSuccess, systemError } = useToast();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') as IdentityType | null;

  const [activeTab, setActiveTab] = useState<IdentityType>(
    identityType || typeParam || DEFAULT_TAB,
  );
  const [passportData, setPassportData] = useState<Record<
    string,
    string
  > | null>(null);
  const [arcData, setArcData] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (identityType) {
      setActiveTab(identityType);
    }
  }, [identityType]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getIdentityData();

        if (!mounted) return;

        setPassportData(res.passport);
        setArcData(res.arc);

        if (initialData) {
          const typeLabel =
            identityType === 'passport' ? '여권' : '외국인 등록증';
          registerSuccess(typeLabel);
        }

        if (identityType) {
          setActiveTab(identityType);
        } else if (typeParam) {
          setActiveTab(typeParam);
        } else {
          if (res.passport) setActiveTab('passport');
          else if (res.arc) setActiveTab('arc');
        }
      } catch (_err) {
        if (mounted) {
          systemError('신분증 정보');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [typeParam, systemError, registerSuccess, initialData, identityType]);

  const handleRegister = (type: IdentityType) => {
    onRegister?.(type);
  };

  const currentDisplayData = useMemo(() => {
    if (initialData) return initialData;
    return activeTab === 'passport' ? passportData : arcData;
  }, [activeTab, passportData, arcData, initialData]);

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
          {(['passport', 'arc'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative rounded-full px-4 py-1.5 font-medium text-sm transition-all',
                activeTab === tab
                  ? 'bg-black-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800',
              )}
            >
              {tab === 'passport' ? '여권' : '등록증'}
            </button>
          ))}
        </div>
      </Header>

      <div className="flex h-[calc(100dvh-60px)] flex-col overflow-hidden bg-white p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-full w-full max-w-sm flex-col sm:max-w-md lg:max-w-lg xl:max-w-2xl">
          {isLoading ? (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-green-ez" />
              <p className="animate-pulse font-medium text-gray-400 text-sm">
                정보를 불러오고 있습니다
              </p>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center text-red-500">
              {error}
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
