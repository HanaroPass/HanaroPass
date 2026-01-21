'use client';

import { useState } from 'react';
import { AccountDrawer } from './components/bottomsheet/AccountDrawer';
import { AlienDrawer } from './components/bottomsheet/AlienDrawer';
import { PassportDrawer } from './components/bottomsheet/PassportDrawer';

export default function IdentityPage() {
  const [openPassport, setOpenPassport] = useState(false);
  const [openAlien, setOpenAlien] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  const handlePassportSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직(API/토스트)로 대체
  };

  const handleAlienSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직(API/토스트)로 대체
  };
  const handleAccountSubmit = (_data: Record<string, string>) => {
    // TODO: 실제 제출 로직(API/토스트)로 대체
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-bold text-2xl">신원 정보 확인</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setOpenPassport(true)}
            className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 font-semibold text-lg">여권 정보 확인</h2>
            <p className="text-gray-500 text-sm">여권 정보를 입력하세요</p>
          </button>

          <button
            type="button"
            onClick={() => setOpenAlien(true)}
            className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 font-semibold text-lg">외국인 등록증</h2>
            <p className="text-gray-500 text-sm">
              외국인 등록증 정보를 입력하세요
            </p>
          </button>

          <button
            type="button"
            onClick={() => setOpenAccount(true)}
            className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 font-semibold text-lg">출입계좌 선택</h2>
            <p className="text-gray-500 text-sm">출입계좌를 선택하세요</p>
          </button>
        </div>
      </div>

      <PassportDrawer
        open={openPassport}
        onOpenChange={setOpenPassport}
        onSubmit={handlePassportSubmit}
      />

      <AlienDrawer
        open={openAlien}
        onOpenChange={setOpenAlien}
        onSubmit={handleAlienSubmit}
      />

      <AccountDrawer
        open={openAccount}
        onOpenChange={setOpenAccount}
        onSubmit={handleAccountSubmit}
      />
    </div>
  );
}
