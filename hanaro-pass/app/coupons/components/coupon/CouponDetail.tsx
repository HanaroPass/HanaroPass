'use client';

import { Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Barcode from 'react-barcode';
import { postPaymentAction } from '@/app/(main)/actions/postPayment.action';
import PinInput from '@/app/(main)/components/PinInput';
import { useCardLockGate } from '@/app/(main)/hooks/useCardLockGate';
import PaymentResultModal from '@/components/payResult/PayResult';
import { useAlert } from '@/providers/alertProvider';

interface CouponDetailProps {
  brandName: string;
  brandPic: string;
  tag: string;
  couponNumber: string;
  id: number;
}

export default function CouponDetail({
  brandPic,
  brandName,
  tag,
  couponNumber,
  id,
}: CouponDetailProps) {
  const { alert } = useAlert();
  const [isPaying, setIsPaying] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);

  const { defaultCardId, isCardUnlocked, isLoading, unlockCard } =
    useCardLockGate();

  const processPayment = async () => {
    if (isPaying) return;
    setIsPaying(true);

    const res = await postPaymentAction({ couponId: id });

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
  };

  const onBarcodeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isPaying || isLoading) return;

    if (defaultCardId !== null && !isCardUnlocked) {
      setShowPinInput(true);
      return;
    }

    await processPayment();
  };

  const handlePinSuccess = async () => {
    if (isPaying || isLoading) return;

    unlockCard();
    setShowPinInput(false);
  };

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-10">
      <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border border-gray-100 shadow-sm">
        <Image
          src={brandPic}
          width={80}
          height={80}
          alt={`${brandName} 로고 이미지`}
          className="h-full w-full object-contain p-1"
        />
      </div>

      <h2 className="font-black text-3xl text-black-900">{brandName}</h2>
      <p className="mt-1 font-medium text-gray-500 text-sm">{tag}</p>

      <p className="mb-6 text-gray-700 text-sm">
        매장에서 바코드를 제시해주세요
      </p>

      <button
        type="button"
        onClick={onBarcodeClick}
        disabled={isPaying || isLoading}
        className="relative mx-auto mt-2 flex h-28 w-65 flex-col items-center justify-center bg-white transition-opacity active:opacity-70 disabled:opacity-50"
        aria-label="쿠폰으로 결제하기"
      >
        <div
          className={`flex h-14 w-full items-center justify-center overflow-hidden rounded-md border bg-white transition-all duration-700 ease-in-out ${
            !isCardUnlocked ? 'blur-sm' : 'blur-0'
          }`}
        >
          <Barcode
            value={couponNumber}
            format="CODE128"
            displayValue={false}
            height={80}
            width={1.6}
            margin={0}
            background="transparent"
          />
        </div>

        {!isCardUnlocked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-gray-100 bg-white/90 p-3 shadow-lg">
              <Lock className="text-black-800" size={24} />
            </div>
          </div>
        )}
      </button>

      <p className="font-medium text-gray-400 text-sm">
        쿠폰번호: <span className="uppercase">{couponNumber}</span>
      </p>
      <div className="mt-6 w-full px-4 text-center text-gray-800 text-xs">
        <p className="mb-2">
          본 쿠폰은{' '}
          <span className="font-semibold text-gray-800">대표계좌</span>에서
          결제됩니다.
          <br />
          결제 계좌 변경은 이 화면에서 할 수 없어요.
        </p>

        <Link href="/" className="inline-block underline">
          메인으로 이동
        </Link>
      </div>

      {showPinInput && (
        <PinInput
          onSuccessAction={handlePinSuccess}
          onCloseAction={() => setShowPinInput(false)}
        />
      )}
    </main>
  );
}
