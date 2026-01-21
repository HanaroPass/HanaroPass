'use client';

import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { AlienDrawer } from './components/bottomsheet/AlienDrawer';
import { PassportDrawer } from './components/bottomsheet/PassportDrawer';

type DrawerType = 'passport' | 'alien' | null;

export default function IdentityPage() {
  const [openDrawer, setOpenDrawer] = useState<DrawerType>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handlePassportSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직(API/토스트)로 대체
  };

  const handleAlienSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직(API/토스트)로 대체
  };

  return (
    <>
      <Header
        title="신분증 등록"
        rightElement={
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="p-2 text-black-900 transition-opacity active:opacity-50"
            aria-label="닫기"
          >
            <X size={24} />
          </Button>
        }
      />

      <div className="min-h-screen bg-white p-6">
        <div className="mx-auto max-w-md">
          {/* 안내 텍스트 */}
          <div className="mb-8">
            <h2 className="mb-2 font-semibold text-gray-800 text-lg">
              인증서 발급을 위해
            </h2>
            <p className="font-semibold text-gray-800 text-lg">
              신분증을 준비해 주세요.
            </p>
          </div>

          <div className="relative mb-8 rounded-lg bg-white p-8">
            <div className="flex h-48 w-full items-center justify-center">
              <Image
                src="/images/identity/identity_img.svg"
                alt="신분증 스캔 이미지"
                width={320}
                height={192}
                className="h-auto max-h-full max-w-full"
              />
            </div>
          </div>

          {/* 신분증 선택 버튼들 */}
          <div className="mb-6 space-y-3">
            <Button
              variant="outline"
              onClick={() => setOpenDrawer('passport')}
              className="w-full rounded-xl border border-hana-green bg-white py-6 font-medium text-hana-green transition-colors hover:bg-hana-green/10"
            >
              여권
            </Button>

            <Button
              variant="outline"
              onClick={() => setOpenDrawer('alien')}
              className="w-full rounded-xl border border-hana-green bg-white py-6 font-medium text-hana-green transition-colors hover:bg-hana-green/10"
            >
              외국인등록증
            </Button>
          </div>

          {/* 동의 체크박스 */}
          <div className="mt-12 mb-6">
            <div className="w-full rounded-xl border border-silver-400 bg-white px-4 py-6">
              <label className="flex items-center justify-between">
                <span className="font-medium text-base text-black-800">
                  전자문서 저장 동의 체크박스
                </span>
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="h-5 w-5 rounded border border-gray-300 text-green-ez accent-green-ez focus:ring-green-ez/50"
                />
              </label>
            </div>
          </div>

          {/* 구분선 */}
          <div className="mb-4 border-gray-200 border-t"></div>

          {/* 이용안내 */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setIsGuideOpen(!isGuideOpen)}
              className="flex h-auto w-full items-center justify-between px-0 py-3 text-gray-600 text-sm hover:bg-transparent"
            >
              <span>이용안내</span>
              {isGuideOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </Button>

            {isGuideOpen && (
              <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-gray-50 p-4 text-gray-600 text-sm">
                <p>
                  • 하나인증서는 국세청, 정부 24, 본인확인 등에 이용할 수
                  있습니다.
                </p>
                <p>
                  • 분실/도난/유효기간 만료/사진훼손 등 정상인식이 불가능한
                  신분증은 이용할 수 없습니다.
                </p>
                <p>
                  • 신분증 발급기관에서 검증되지 않는 신분증은 거부될 수
                  있습니다.
                </p>
                <p>• 추가적인 이용안내 내용이 여기에 표시됩니다.</p>
                <p>• 보다 자세한 이용내용은 고객센터를 통해 문의해주세요.</p>
              </div>
            )}
          </div>

          <PassportDrawer
            open={openDrawer === 'passport'}
            onOpenChange={(open) => setOpenDrawer(open ? 'passport' : null)}
            onSubmit={handlePassportSubmit}
          />

          <AlienDrawer
            open={openDrawer === 'alien'}
            onOpenChange={(open) => setOpenDrawer(open ? 'alien' : null)}
            onSubmit={handleAlienSubmit}
          />
        </div>
      </div>
    </>
  );
}
