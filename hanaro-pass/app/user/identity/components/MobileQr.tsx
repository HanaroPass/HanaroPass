'use client';

import type { IdentityType } from '../hooks/useFunnel';

type MobileQrProps = {
  type: IdentityType;
  data: Record<string, string>;
};

export default function MobileQr({ type, data }: MobileQrProps) {
  const isPassport = type === 'passport';

  return (
    <div className="flex h-full flex-col space-y-6">
      {/* QR Code Card */}
      <div className="rounded-2xl bg-teal-500 p-6 text-white">
        <div className="mb-4 text-center">
          <p className="text-sm opacity-90">잔여 시간 : 4 seconds</p>
        </div>
        <div className="mx-auto h-64 w-64 rounded-xl bg-white p-4">
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-900">
            <div className="text-white text-xs">QR CODE</div>
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
