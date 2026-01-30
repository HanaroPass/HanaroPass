'use client';

import Image from 'next/image';
import { useState } from 'react';
import ActionButton from '@/components/ui/ActionButton';
import { useToast } from '@/hooks/useToast';
import { useAlert } from '@/providers/alertProvider';
import HospitalGuide from '../medical/components/languageRegistration/HospitalGuide';

const POUCH_ILLUSTRATION = '/images/pouch/lucky_pouch.png';
const POUCH_VIDEO = '/videos/pouch/pouch_send.mp4';

export default function LuckyPouchPage() {
  const { alert, close } = useAlert();
  const { success, error } = useToast();

  const [isPlaying, setIsPlaying] = useState(false);

  const sideBySideLayout =
    '[&>footer]:flex-row [&>footer]:gap-3 sm:max-w-[380px]';
  const brandBtnStyle = '!bg-hana-green !text-white flex-1 font-bold py-6 ';
  const cancelBtnStyle = 'flex-1 mt-0 py-6 bg-gray-100 text-black-600';

  const showShareModal = () => {
    setIsPlaying(false);
    const randomId = Math.random().toString(36).substring(2, 10);
    const shareLink = `${window.location.origin}/pouch/receive/${randomId}`;

    alert({
      title: '복주머니 준비 완료!',
      description: '아래 링크를 친구에게 공유하면 복주머니가 적립됩니다.',
      contentClassName: sideBySideLayout,
      content: (
        <div className="mt-1 break-all rounded-lg border border-gray-100 bg-gray-50 p-3 font-mono text-green-dark text-xs">
          {shareLink}
        </div>
      ),
      actionLabel: '링크 복사하기',
      cancelLabel: '취소',
      actionProps: { className: brandBtnStyle },
      cancelProps: { className: cancelBtnStyle },
      onAction: async () => {
        try {
          await navigator.clipboard.writeText(shareLink);
          success('복사 완료', '공유 링크가 클립보드에 복사되었습니다.');
        } catch (err) {
          console.error('Failed to copy:', err);
          error(
            '복사 실패',
            '보안 설정으로 인해 자동 복사가 차단되었습니다. 화면의 링크를 길게 눌러 복사해주세요.',
          );
        }
      },
    });
  };

  const handlePouchClick = () => {
    alert({
      title: '복주머니 보내기',
      contentClassName: sideBySideLayout,
      description: 'Jessica Kim님께 복주머니를 보내시겠습니까?',
      actionLabel: '보내기',
      cancelLabel: '취소',
      actionProps: { className: brandBtnStyle },
      cancelProps: { className: cancelBtnStyle },
      closeOnAction: false,
      onAction: () => {
        setIsPlaying(true);
        close();
      },
    });
  };

  const handleCheckPouch = () => {
    alert({
      title: '적립된 하나머니',
      content: (
        <div className="flex flex-col items-center justify-center pb-4">
          <p className="mb-4 text-black-600 text-sm">
            현재까지 복주머니로 적립된 하나머니
          </p>
          <span className="font-bold text-4xl text-hana-green">10,000P</span>
        </div>
      ),
      actionLabel: '확인',
      hideCancel: true,
      actionProps: {
        className: '!bg-hana-green !text-white w-32 mx-auto',
      },
    });
  };

  return (
    <div className="flex h-screen flex-col bg-white font-sans">
      <main className="relative flex flex-1 flex-col items-center pb-8">
        {isPlaying && (
          <div className="fixed inset-0 z-100 bg-linear-to-b from-[#74a5cb] to-[#d2e8f1]">
            <video
              src={POUCH_VIDEO}
              autoPlay
              muted
              playsInline
              onEnded={showShareModal}
              onError={() => {
                setIsPlaying(false);
                error('비디오 로드 실패', '잠시 후 다시 시도해 주세요.');
              }}
              className="pointer-events-none h-full w-full object-contain"
            />
          </div>
        )}
        <div className="flex w-full flex-1 flex-col items-center justify-center bg-white-ez pt-6">
          <div className="px-6 text-center">
            <h2 className="font-semibold text-2xl text-black-900 tracking-tight">
              친구에게 복주머니를 보내세요!
            </h2>
            <div className="mt-3 text-base text-black-800 leading-relaxed">
              <p>한국으로 놀러오는 친구에게</p>
              <p>하나머니를 선물해보세요</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePouchClick}
            aria-label="Jessica Kim에게 복주머니 보내기"
            className="justify-centerbg-hana-green relative my-4 flex aspect-square w-full max-w-125 items-center outline-none transition-transform"
          >
            <Image
              src={POUCH_ILLUSTRATION}
              alt="복주머니 일러스트"
              fill
              className="pointer-events-none object-contain"
              priority
            />
          </button>

          <HospitalGuide
            text={`친구의 네임태그를 선택하면 복주머니가 발송돼요!`}
          />
        </div>
      </main>
      <footer className="sticky bottom-0 z-50 bg-white px-6 pt-6 pb-8">
        <ActionButton
          text="적립된 하나머니 확인"
          onClick={handleCheckPouch}
          className="bg-hana-green text-white"
        />
      </footer>
    </div>
  );
}
