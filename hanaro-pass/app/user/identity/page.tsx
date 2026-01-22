'use client';

import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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

  const guideRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    router.back();
  };

  const handlePassportSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직
  };

  const handleAlienSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직
  };

  useEffect(() => {
    if (isGuideOpen && guideRef.current) {
      setTimeout(() => {
        guideRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [isGuideOpen]);

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

      <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white p-4 pb-10 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col sm:max-w-md sm:flex-none lg:max-w-lg xl:max-w-2xl">
          {/* [핵심 수정] shrink-0 추가 
            이 div에 shrink-0을 적용하여, 화면 높이가 부족하더라도
            내부 콘텐츠(문구, 이미지, 버튼)가 절대 찌그러지지 않도록 합니다.
          */}
          <div className="shrink-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-2 font-semibold text-base text-gray-800 sm:text-lg lg:text-xl">
                인증서 발급을 위해
              </h2>
              <p className="font-semibold text-base text-gray-800 sm:text-lg lg:text-xl">
                신분증을 준비해 주세요.
              </p>
            </div>

            <div className="relative mb-6 rounded-lg bg-white p-4 sm:mb-8 sm:p-6 lg:p-8">
              {/* 이미지 컨테이너 높이 명시 및 내부 이미지 비율 유지 설정 */}
              <div className="relative flex h-40 w-full items-center justify-center sm:h-48 md:h-56">
                <Image
                  src="/images/identity/identity_img.svg"
                  alt="신분증 스캔 이미지"
                  fill // 부모 요소에 맞춰 채움
                  className="object-contain" // 비율 유지하며 컨테이너 안에 표시
                />
              </div>
            </div>

            <div className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
              <Button
                variant="outline"
                onClick={() => setOpenDrawer('passport')}
                className="w-full rounded-xl border border-hana-green bg-white py-4 font-medium text-hana-green text-sm transition-colors hover:bg-hana-green/10 sm:py-6 sm:text-base"
              >
                여권
              </Button>

              <Button
                variant="outline"
                onClick={() => setOpenDrawer('alien')}
                className="w-full rounded-xl border border-hana-green bg-white py-4 font-medium text-hana-green text-sm transition-colors hover:bg-hana-green/10 sm:py-6 sm:text-base"
              >
                외국인등록증
              </Button>
            </div>
          </div>

          {/* 하단 고정 영역 */}
          <div className="mt-auto pt-8 sm:mt-20">
            <div className="mb-4">
              <div className="w-full rounded-xl border border-silver-400 bg-silver-400 px-3 py-4 sm:px-4 sm:py-6">
                <label className="flex cursor-pointer items-center justify-between">
                  <span className="font-medium text-black-800 text-sm sm:text-base">
                    전자문서 저장 동의 체크박스
                  </span>
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="h-5 w-5 rounded border border-gray-300 text-green-ez focus:ring-green-ez/50"
                    style={{
                      accentColor: '#01a5ac',
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="mb-4 border-gray-200 border-t"></div>

            <div
              ref={guideRef}
              className="scroll-mt-20 transition-all duration-300"
            >
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
                /* 수정 사항:
    1. bg-gray-50, rounded-lg, p-4 제거 -> 회색 박스 삭제
    2. text-sm -> 14px 적용
    3. font-normal -> Regular (Pretendard Regular) 적용
    4. text-gray-800 -> 기존보다 더 진한 회색 (검정에 가까움)
    5. px-2 -> 텍스트가 너무 딱 붙지 않게 약간의 좌우 여백 (선택사항)
  */
                <div className="fade-in slide-in-from-top-2 mt-4 animate-in px-2 font-normal text-gray-800 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      {/* 점(•) 색상은 본문보다 약간 연하게(gray-400) 하거나 같게 설정 */}
                      <span className="mr-2 shrink-0 select-none text-gray-400">
                        •
                      </span>
                      <span className="leading-relaxed">
                        하나인증서는 국세청, 정부 24, 본인확인 등에 이용할 수
                        있습니다.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 shrink-0 select-none text-gray-400">
                        •
                      </span>
                      <span className="leading-relaxed">
                        분실/도난/유효기간 만료/사진훼손 등 정상인식이 불가능한
                        신분증은 이용할 수 없습니다.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 shrink-0 select-none text-gray-400">
                        •
                      </span>
                      <span className="leading-relaxed">
                        신분증 발급기관에서 검증되지 않는 신분증은 거부될 수
                        있습니다.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
