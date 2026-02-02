'use client';

import { Loader, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Barcode from 'react-barcode';
import PaymentResultModal from '@/components/payResult/PayResult';
import { useAlert } from '@/providers/alertProvider';
import type { UserCardResponse } from '../actions/getUserCards.schema';
import { issueBarcodeTokenAction } from '../actions/issueBarcodeToken.action';
import { postPaymentAction } from '../actions/postPayment.action';
import { topUpCardAction } from '../actions/topUpCard.action';

interface CardProps {
  cards: UserCardResponse[];
  unlockedCardIds: Set<number>;
  onLockClickAction: (id: number) => void;
}

const CardItem = memo(
  ({
    card,
    index,
    activeIndex,
  }: {
    card: UserCardResponse;
    index: number;
    activeIndex: number;
  }) => {
    const diff = index - activeIndex;
    const rotateY = diff === 0 ? 0 : diff > 0 ? -25 : 25;
    const translateX = diff * 70;
    const translateZ = Math.abs(diff) * -150;
    const scale = 1 - Math.abs(diff) * 0.1;

    return (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: `
            translateX(${translateX}px)
            translateZ(${translateZ}px)
            rotateY(${rotateY}deg)
            scale(${scale})
          `,
          zIndex: 100 - Math.abs(diff),
          opacity: Math.abs(diff) > 2 ? 0 : 1,
        }}
      >
        <div className="h-41.25 w-65.5 overflow-hidden rounded-xl">
          <Image
            src={card.imageUrl}
            alt={card.cardType}
            width={262}
            height={165}
            className="h-full w-full select-none object-cover"
            priority={index === 0}
          />
        </div>
      </div>
    );
  },
);

export default function Card({
  cards,
  unlockedCardIds,
  onLockClickAction,
}: CardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [barcodeToken, setBarcodeToken] = useState<string | null>(null);
  const [isIssuingToken, setIsIssuingToken] = useState(false);

  const router = useRouter();
  const { alert } = useAlert();

  const activeCard = useMemo(
    () => cards[activeIndex] ?? null,
    [cards, activeIndex],
  );

  const activeCardId = activeCard?.id ?? null;

  const isCurrentUnlocked = useMemo(() => {
    if (!activeCard) return false;
    return unlockedCardIds.has(activeCard.id);
  }, [activeCard, unlockedCardIds]);

  const handleSwipe = useCallback(
    (direction: 'NEXT' | 'PREV') => {
      if (isAnimating) return;

      setActiveIndex((prev) => {
        if (direction === 'NEXT' && prev < cards.length - 1) return prev + 1;
        if (direction === 'PREV' && prev > 0) return prev - 1;
        return prev;
      });

      setIsAnimating(true);
      window.setTimeout(() => setIsAnimating(false), 500);
    },
    [cards.length, isAnimating],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 40) handleSwipe(diff > 0 ? 'NEXT' : 'PREV');
    touchStartRef.current = null;
  };

  const refreshBarcodeToken = useCallback(async () => {
    if (!activeCardId) return;
    if (!isCurrentUnlocked) return;
    if (isIssuingToken) return;

    setIsIssuingToken(true);
    const res = await issueBarcodeTokenAction({ cardId: activeCardId });
    setIsIssuingToken(false);

    if (!res.success) {
      if (!barcodeToken) {
        alert({ title: '바코드 생성 실패', description: res.message });
      }
      return;
    }

    setBarcodeToken(res.data.barcodeToken);
  }, [activeCardId, isCurrentUnlocked, isIssuingToken, barcodeToken, alert]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: '초기화를 위해 의존성 주입'
  useEffect(() => {
    setBarcodeToken(null);
  }, [activeCardId]);

  useEffect(() => {
    if (!isCurrentUnlocked) {
      setBarcodeToken(null);
      return;
    }

    if (!barcodeToken) {
      void refreshBarcodeToken();
    }
  }, [isCurrentUnlocked, barcodeToken, refreshBarcodeToken]);

  const pay = useCallback(async () => {
    if (isPaying) return;

    if (!barcodeToken) return;

    setIsPaying(true);
    const res = await postPaymentAction({ barcodeToken });
    setIsPaying(false);

    if (!res.success) {
      alert({
        render: () => (
          <PaymentResultModal
            variant="fail"
            title="결제가 완료되지 않았어요"
            description={res.message ?? '카드 정보를 다시 확인해주세요'}
          />
        ),
        srTitle: '결제가 완료되지 않았어요',
        srDescription: res.message ?? '카드 정보를 다시 확인해주세요',
      });
      return;
    }

    const data = res.data;

    alert({
      render: () => (
        <PaymentResultModal
          variant="success"
          title="결제가 완료됐어요"
          amountLabel={`원화 ${data.paidAmount.toLocaleString()}원`}
          savedAmount={data.savedAmount}
        />
      ),
      srTitle: '결제가 완료됐어요',
      srDescription: `원화 ${data.paidAmount.toLocaleString()}원 결제`,
    });

    void refreshBarcodeToken();
  }, [isPaying, barcodeToken, alert, refreshBarcodeToken]);

  if (!activeCard) return null;

  const onBarcodeAreaClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isCurrentUnlocked) {
      onLockClickAction(activeCard.id);
      return;
    }

    if (!barcodeToken) return;

    await pay();
  };

  const onDevTopUpClick = async () => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!activeCard) return;

    const res = await topUpCardAction({
      cardId: activeCard.id,
      amount: 10_000,
    });

    if (!res.success) {
      alert({ title: '충전을 실패했어요', description: res.message });
      return;
    }
    router.refresh();
  };

  const barcodeValue = barcodeToken ?? '000000000000';
  const isBarcodeClickable = isCurrentUnlocked && !!barcodeToken && !isPaying;

  return (
    <div className="w-full select-none overflow-hidden rounded-4xl border border-gray-100 bg-white px-10 py-8 shadow-sm">
      <div
        className="relative h-48 w-full touch-none"
        style={{ perspective: '1200px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {cards.map((card, index) => (
          <CardItem
            key={card.id}
            card={card}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>

      <div className="mx-auto flex h-7.5 w-65 items-center justify-between rounded-lg bg-[linear-gradient(91deg,#00D7B7_0.22%,#48AFAD_40.09%,#008485_100%)] px-2 text-white">
        <p className="font-bold text-[12px] opacity-70">잔액</p>
        <p className="font-bold text-[12px]">
          {Number(activeCard.balance).toLocaleString()}원
        </p>
      </div>

      <button
        type="button"
        className="relative mx-auto mt-2 flex h-28 w-65 flex-col items-center justify-center bg-white transition-opacity active:opacity-70 disabled:opacity-50"
        onClick={onBarcodeAreaClick}
        disabled={!isBarcodeClickable && isCurrentUnlocked}
        aria-label={
          !isCurrentUnlocked
            ? 'PIN 번호를 입력하여 바코드 보기'
            : !barcodeToken
              ? '바코드 생성 중'
              : '바코드를 클릭하여 결제하기'
        }
      >
        <div
          className={`flex h-14 w-full items-center justify-center overflow-hidden rounded-md border bg-white ${
            !isCurrentUnlocked ? 'blur-sm' : 'blur-0'
          }`}
        >
          <Barcode
            value={barcodeValue}
            format="CODE128"
            displayValue={false}
            height={48}
            width={1}
            margin={0}
          />
        </div>

        {!isCurrentUnlocked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-gray-100 bg-white/90 p-3 shadow-lg">
              <Lock className="text-black-800" size={24} />
            </div>
          </div>
        )}

        {isCurrentUnlocked && !barcodeToken && (
          <Loader className="mx-auto h-8 w-8 animate-spin text-green-ez" />
        )}
      </button>

      {process.env.NODE_ENV === 'development' && (
        <button
          type="button"
          onClick={onDevTopUpClick}
          className="fixed right-4 bottom-4 z-9999 rounded-md bg-green-ez px-3 py-1.5 font-semibold text-white text-xs shadow-md active:opacity-80 disabled:opacity-50"
        >
          +10,000
        </button>
      )}
    </div>
  );
}
