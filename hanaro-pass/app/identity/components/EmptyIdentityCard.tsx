'use client';

import Image from 'next/image';
import ActionButton from '@/components/ui/ActionButton';
import type { IdentityType } from '../IdentityPageClient';

type EmptyIdentityCardProps = {
  type: IdentityType;
  onRegister: () => void;
};

export default function EmptyIdentityCard({
  type,
  onRegister,
}: EmptyIdentityCardProps) {
  const isPassport = type === 'passport';

  return (
    <div className="flex h-full flex-col justify-between pb-2">
      <div className="flex flex-1 flex-col items-center justify-start pt-24">
        <Image
          src="/images/identity/identity_img.svg"
          alt={`${isPassport ? '여권' : '신분증'} 스캔 이미지`}
          width={240}
          height={240}
          className="mx-auto object-contain"
          priority
        />

        <div className="mt-24 space-y-3 text-center font-medium text-gray-800 text-lg">
          <p>등록된 {isPassport ? '여권' : '외국인등록증'}이 없습니다.</p>
          <p>{isPassport ? '여권' : '신분증'}을 등록하시겠습니까?</p>
        </div>
      </div>

      <ActionButton
        text={`${isPassport ? '여권' : '외국인등록증'} 등록하기`}
        onClick={onRegister}
      />
    </div>
  );
}
