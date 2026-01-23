'use client';

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

  // QR 코드에 들어갈 데이터를 JSON 형태로 생성
  const qrData = JSON.stringify({
    type,
    ...data,
    timestamp: qrKey,
  });

  // 타이머 관리
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 시간이 다 되면 새로운 QR 코드 생성
          setTimeout(() => {
            setQrKey(Date.now());
            setTimeLeft(30);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft === 0;

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* QR Code Card */}
      <div
        className="rounded-2xl p-6 text-white"
        style={{
          background:
            'linear-gradient(139deg, #01A5AC 0%, #5BC1C4 19.54%, #D9E8E5 98.01%)',
        }}
      >
        <div className="mb-4 text-center">
          <p className="font-semibold text-lg opacity-90">
            잔여 시간 : {timeLeft} seconds
            {isExpired && (
              <span className="ml-2 text-xs opacity-75">(Refresh)</span>
            )}
          </p>
        </div>
        <div className="mx-auto h-64 w-64 rounded-xl bg-white p-4">
          <div
            className={`flex h-full w-full items-center justify-center transition-all duration-300 ${
              isExpired ? 'opacity-100 blur-md' : ''
            }`}
          >
            <QRCode
              value={qrData}
              size={224}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              viewBox="0 0 256 256"
            />
          </div>
        </div>
      </div>

      {/* Identity Information Card */}
      <div className="flex flex-1 space-x-4">
        {/* Photo */}
        <div className="h-40 w-32 shrink-0 rounded-xl bg-gray-900">
          {/* Photo placeholder */}
        </div>

        {/* Information */}
        <div className="flex-1 space-y-4">
          {isPassport ? (
            <>
              <div>
                <p className="text-gray-600 text-sm">COUNTRY</p>
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-8 rounded bg-blue-500"></div>
                  <span className="font-medium">{data.country || 'USA'}</span>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Passport Number</p>
                <p className="font-medium text-lg text-teal-600">
                  {data.passportNumber || 'M12345678'}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="font-medium">{data.status || 'B-04'}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Permission</p>
                <p className="font-medium">{data.permission || '2024-03-15'}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
