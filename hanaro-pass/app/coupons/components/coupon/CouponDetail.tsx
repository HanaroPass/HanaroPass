'use client';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import Barcode from 'react-barcode';
import { postPaymentAction } from '@/app/(main)/actions/postPayment.action';
import { useCardLockGate } from '@/app/(main)/hooks/useCardLock';

interface CouponDetailProps {
  brandName: string;
  brandPic: string;
  tag: string;
  couponNumber: string;
  id: number;
  defaultCardId: number;
}

export default function CouponDetail({
  brandPic,
  brandName,
  tag,
  couponNumber,
  id,
  defaultCardId,
}: CouponDetailProps) {
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const gate = useCardLockGate();

  const isDefaultUnlocked = useMemo(
    () => gate.isUnlocked(defaultCardId),
    [gate, defaultCardId],
  );

  const pay = useCallback(async () => {
    if (isPaying) return;
    setIsPaying(true);

    const res = await postPaymentAction({ couponId: id });

    setIsPaying(false);

    if (!res.success) {
      alert(res.message);
      return;
    }

    alert('결제가 완료되었습니다.');
    router.push('/');
  }, [id, isPaying, router]);

  const onBarcodeClick = async () => {
    if (!isDefaultUnlocked) {
      gate.requestUnlock(defaultCardId);
      return;
    }
    await pay();
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

      <div className="my-10 aspect-square w-full max-w-70 overflow-hidden rounded-2xl bg-[#E0F2F1]/50">
        <div className="flex h-full items-center justify-center bg-linear-to-br from-[#E0F2F1] to-white p-6">
          <Image
            src="/images/benefits/character_star.svg"
            alt="쿠폰 캐릭터"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>
      </div>

      <p className="mb-6 text-gray-700 text-sm">
        매장에서 바코드를 제시해주세요
      </p>

      <button
        type="button"
        onClick={onBarcodeClick}
        disabled={isPaying}
        className="relative flex flex-col items-center gap-3 active:opacity-70 disabled:opacity-40"
        aria-label={
          !isDefaultUnlocked
            ? 'PIN 번호를 입력하여 바코드 보기'
            : '쿠폰으로 결제하기'
        }
      >
        <div
          className={`flex items-center justify-center overflow-hidden rounded-md bg-white py-2 transition-all duration-700 ease-in-out ${
            !isDefaultUnlocked ? 'blur-sm' : 'blur-0'
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

        {!isDefaultUnlocked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-gray-100 bg-white/90 p-3 shadow-lg">
              <Lock className="text-black-800" size={24} />
            </div>
          </div>
        )}

        <p className="font-medium text-gray-400 text-sm">
          쿠폰번호: <span className="uppercase">{couponNumber}</span>
        </p>
      </button>

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
    </main>
  );
}
