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
  const [isExpired, setIsExpired] = useState(false);

  const qrData = JSON.stringify({
    type,
    ...data,
    timestamp: qrKey,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          setTimeout(() => {
            setQrKey(Date.now());
            setIsExpired(false);
            setTimeLeft(30);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <div
      className={`flex min-h-full flex-col overflow-y-auto pb-4 ${isPassport ? 'space-y-6' : '-space-y-22'}`}
    >
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
              <span className="ml-2 text-xs opacity-75">(Refresh)</span>
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

      <div className="flex flex-1 justify-center px-2">
        {isPassport ? (
          <div className="flex w-full max-w-md flex-col space-y-4">
            <div className="flex space-x-5">
              {PhotoSection}
              <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-gray-50 p-4">
                <div className="mb-3 rounded-md bg-gray-800 px-3 py-1">
                  <span className="font-semibold text-white text-xs tracking-wider">
                    COUNTRY
                  </span>
                </div>
                <Image
                  src={`/images/identity/${data.country || 'USA'}.png`}
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

            <div className="flex w-full items-center justify-between rounded-2xl bg-gray-50 px-6 py-5 text-gray-800">
              <span className="sm font-regular">Passport Number</span>
              <span className="font-bold text-green-ez text-xl tracking-tight">
                {data.passportNumber || 'M12345678'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-md items-center space-x-5">
            {PhotoSection}
            <div className="flex h-48 flex-1 flex-col justify-center space-y-4 rounded-2xl bg-gray-50 px-4 py-2 text-gray-800">
              <div>
                <p className="mb-1 font-semibold text-xl">Status</p>
                <p className="font-regular text-sm">{data.status || 'B-04'}</p>
              </div>

              <div className="h-px w-full bg-gray-200" />

              <div>
                <p className="mb-1 font-semibold text-xl">Permission</p>
                <p className="font-regular text-sm">
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
