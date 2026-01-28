'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ActionButton from '@/components/ui/ActionButton';
import { useToast } from '@/hooks/useToast';
import { useAlert } from '@/providers/alertProvider';
import HospitalGuide from '../medical/components/languageRegistration/HospitalGuide';

const POUCH_ILLUSTRATION = '/images/pouch/lucky_pouch.png';

export default function LuckyPouchPage() {
  const router = useRouter();
  const { alert } = useAlert();
  const { success } = useToast();

  const handlePouchClick = () => {
    alert({
      title: '복주머니 보내기',
      description: 'Jessica Kim님께 복주머니를 보내시겠습니까?',
      actionLabel: '보내기',
      cancelLabel: '취소',
      onAction: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        success('전송 완료', 'Jessica Kim님께 복주머니가 전달되었습니다! ');
      },
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white font-sans">
      <main className="flex flex-1 flex-col items-center justify-center pt-6">
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
      </main>

      <footer className="px-6 py-8">
        <ActionButton
          text="받은 하나머니 확인"
          onClick={() => router.push('/medical/registrations')}
          className="bg-(--color-green-dark) text-white" // 포인트 컬러 적용
        />
      </footer>
    </div>
  );
}
