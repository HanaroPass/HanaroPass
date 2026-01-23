'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import type { IdentityType } from '../hooks/useFunnel';

type MobileQrProps = {
  type: IdentityType;
  data: Record<string, string>;
};

export default function MobileQr({ type, data }: MobileQrProps) {
  const isPassport = type === 'passport';
  const [timeLeft, setTimeLeft] = useState(30);
  const [qrKey, setQrKey] = useState(Date.now());

  const qrData = JSON.stringify({
    type,
    ...data,
    timestamp: qrKey,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setQrKey(Date.now());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft === 0;

  // 📸 [핵심] 사진 영역을 변수로 분리 (재사용을 위해)
  const PhotoSection = (
    <div className="h-48 w-36 shrink-0 overflow-hidden rounded-xl bg-gray-200 shadow-inner">
      <Image
        src="/images/identity/man.png"
        alt="Identity Photo"
        width={144}
        height={192}
        className="h-full w-full object-cover"
      />
    </div>
  );

  return (
    <div className="flex min-h-full flex-col space-y-6 overflow-y-auto pb-4">
      {/* 1. QR Code Card */}
      <div
        className="rounded-2xl p-6 text-white shadow-lg"
        style={{
          background:
            'linear-gradient(139deg, #01A5AC 0%, #5BC1C4 19.54%, #D9E8E5 98.01%)',
        }}
      >
        <div className="mb-4 text-center">
          <p className="font-semibold text-lg opacity-90">
            남은 시간 : {timeLeft}초
            {isExpired && (
              <span className="ml-2 text-xs opacity-75">(갱신 중...)</span>
            )}
          </p>
        </div>

        <div className="mx-auto aspect-square w-64 rounded-xl bg-white p-4">
          <div
            className={`flex h-full w-full items-center justify-center transition-all duration-300 ${
              isExpired ? 'opacity-50 blur-sm' : 'opacity-100'
            }`}
          >
            <QRCode
              value={qrData}
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              viewBox="0 0 256 256"
            />
          </div>
        </div>
      </div>

      {/* 2. Identity Info Area (조건부 레이아웃) */}
      <div className="flex flex-1 justify-center px-2">
        {isPassport ? (
          // ✈️ 여권용 레이아웃: 세로(flex-col) 배치
          // [상단] 사진 + 국가정보
          // [하단] 여권번호 (긴 박스)
          <div className="flex w-full max-w-md flex-col space-y-4">
            {/* 상단: 사진 + 국가 */}
            <div className="flex space-x-5">
              {PhotoSection} {/* 변수로 만든 사진 재사용 */}
              {/* 우측 국가 정보 */}
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-gray-50 p-4">
                <div className="mb-3 rounded-md bg-gray-800 px-3 py-1">
                  <span className="font-semibold text-white text-xs tracking-wider">
                    COUNTRY
                  </span>
                </div>
                <Image
                  src="/images/identity/USA.png"
                  alt="Country Flag"
                  width={80}
                  height={50}
                  className="mb-2 rounded border border-gray-200 shadow-sm"
                />
                <span className="font-medium text-gray-900 text-sm">
                  {data.country || 'USA'}
                </span>
              </div>
            </div>

            {/* 하단: 여권 번호 (긴 박스) */}
            <div className="flex w-full items-center justify-between rounded-2xl bg-gray-50 px-6 py-5">
              <span className="sm font-regular text-gray-800">
                Passport Number
              </span>
              <span className="font-bold text-green-ez text-xl tracking-tight">
                {data.passportNumber || 'M12345678'}
              </span>
            </div>
          </div>
        ) : (
          // 🆔 외국인등록증 레이아웃: 가로(flex-row) 배치
          // [좌측] 사진
          // [우측] Status + Permission (세로 정렬)
          <div className="flex w-full max-w-md items-center space-x-5">
            {PhotoSection} {/* 변수로 만든 사진 재사용 */}
            {/* 우측 정보 박스 */}
            <div className="flex h-48 flex-1 flex-col justify-center space-y-4 rounded-2xl bg-gray-50 px-4 py-2">
              {/* Status */}
              <div>
                <p className="mb-1 font-semibold text-gray-500 text-sm">
                  Status
                </p>
                <p className="font-bold text-2xl text-gray-900">
                  {data.status || 'B-04'}
                </p>
              </div>

              {/* 구분선 (선택사항) */}
              <div className="h-px w-full bg-gray-200" />

              {/* Permission */}
              <div>
                <p className="mb-1 font-semibold text-gray-500 text-sm">
                  Permission
                </p>
                <p className="font-bold text-gray-900 text-xl">
                  {data.permission || '2024-03-15'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
