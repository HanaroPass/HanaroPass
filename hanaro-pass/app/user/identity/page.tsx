'use client';

import { useState } from 'react';
import { IdentityFormDrawer } from './components/IdentityFormDrawer';

export default function IdentityPage() {
  const [openPassport, setOpenPassport] = useState(false);
  const [openAlien, setOpenAlien] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-bold text-2xl">신원 정보 확인</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* 여권 */}
          <button
            type="button"
            onClick={() => setOpenPassport(true)}
            className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 font-semibold text-lg">여권 정보 확인</h2>
            <p className="text-gray-500 text-sm">여권 정보를 입력하세요</p>
          </button>

          {/* 외국인 등록증 */}
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

          {/* 출입계좌 */}
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

      {/* Drawers */}
      <IdentityFormDrawer
        type="passport"
        open={openPassport}
        onOpenChange={setOpenPassport}
        onSubmit={(data) => {
          console.log('여권 정보:', data);
          alert('여권 정보가 제출되었습니다!');
        }}
      />

      <IdentityFormDrawer
        type="alien-registration"
        open={openAlien}
        onOpenChange={setOpenAlien}
        onSubmit={(data) => {
          console.log('외국인 등록증 정보:', data);
          alert('외국인 등록증 정보가 제출되었습니다!');
        }}
      />

      <IdentityFormDrawer
        type="account"
        open={openAccount}
        onOpenChange={setOpenAccount}
        onSubmit={(data) => {
          console.log('출입계좌:', data);
          alert('출입계좌가 선택되었습니다!');
        }}
      />
    </div>
  );
}
