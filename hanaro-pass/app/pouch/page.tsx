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
  const brandBtnStyle = '!bg-(--color-green-dark) !text-white flex-1';
  const cancelBtnStyle = 'flex-1 mt-0';

  const showShareModal = () => {
    setIsPlaying(false);
    const randomId = Math.random().toString(36).substring(2, 10);
    const shareLink = `${window.location.origin}/pouch/receive/${randomId}`;

    alert({
      title: '복주머니 준비 완료!',
      description: '아래 링크를 친구에게 공유하면 복주머니가 적립됩니다.',
      contentClassName: sideBySideLayout,
      content: (
        <div className="mt-1 break-all rounded-lg border border-gray-100 bg-gray-50 p-3 font-mono text-(--color-green-dark) text-xs">
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
      title: '받은 하나머니',
      content: (
        <div className="flex flex-col items-center justify-center py-4">
          <p className="mb-1 text-black-600 text-sm">현재까지 적립된 포인트</p>
          <span className="font-bold text-(--color-green-dark) text-4xl">
            10,000P
          </span>
        </div>
      ),
      actionLabel: '확인',
      hideCancel: true,
      actionProps: {
        className: '!bg-(--color-green-dark) !text-white w-32 mx-auto',
      },
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white font-sans">
      <main className="relative flex flex-1 flex-col items-center overflow-hidden">
        {isPlaying && (
          <div className="fixed inset-0 z-100 bg-gradient-to-b from-[#72ACD1] to-[#BDDBEC]">
            <video
              src={POUCH_VIDEO}
              autoPlay
              muted
              playsInline
              onEnded={showShareModal}
              className="pointer-events-none h-full w-full object-contain"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col items-center justify-center pt-6">
          <div className="px-6 text-center">
            <h2 className="font-semibold text-2xl text-black-900 tracking-tight">
              친구에게 복주머니를 보내세요!
            </h2>
            <div className="mt-3 text-black-800 text-lg leading-relaxed">
              <p>한국으로 놀러오는 친구에게</p>
              <p>하나머니를 선물해보세요</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePouchClick}
            aria-label="Jessica Kim에게 복주머니 보내기"
            className="relative my-4 flex aspect-square w-full max-w-125 items-center justify-center outline-none transition-transform"
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
            text={`캐리어에서 친구의 네임태그를 선택하면 \n 복주머니가 발송돼요!`}
          />
        </div>
      </main>
      <footer className="px-6 py-8">
        <ActionButton
          text="받은 하나머니 확인"
          onClick={handleCheckPouch}
          className="bg-(--color-green-dark) text-white"
        />
      </footer>
    </div>
  );
}
