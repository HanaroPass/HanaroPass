// 서류 보관함 : 클릭된 카드 컴포넌트의 서류 프리뷰
'use client';

import { CircleCheck } from 'lucide-react';
import Image from 'next/image';

type DocsPreviewProps = {
  userName: string;
};

export default function DocsPreview({ userName }: DocsPreviewProps) {
  return (
    <div className="relative h-41 w-65 rounded-[15px] bg-green-300 shadow-[0_12px_24px_rgba(255,255,255,0.35)]">
      {/*로고 영역 */}
      <div className="absolute p-4">
        <div
          className="grid h-8 w-8 place-items-center rounded-full"
          style={{
            border: '3px solid rgba(1,165,172,0.35)',
          }}
        >
          <CircleCheck className="text-green-ez" size={15} />
        </div>
        <p className="font-sans font-semibold text-[9px] text-green-ez">
          TRUST
        </p>
        <p className="font-sans font-semibold text-[12px] text-green-ez leading-[1.1]">
          HANA
        </p>
      </div>

      {/*사진 영역 */}
      <div className="absolute top-10 left-23">
        <Image
          src="/images/docs/dreamCardPreview.png"
          alt="document preview"
          width={92}
          height={92}
          className="h-20 w-20 object-contain"
          priority
        />
      </div>

      {/* 하단 텍스트 */}
      <div className="absolute bottom-4 left-0 flex w-full justify-between px-4">
        <p className="font-sans font-semibold text-[9px] text-black-900 tracking-widest">
          2026.10.25.까지
        </p>
        <p className="font-sans font-semibold text-[9px] text-black-900 tracking-widest">
          {userName}
        </p>
      </div>
    </div>
  );
}
