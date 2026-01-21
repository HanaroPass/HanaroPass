'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="-ml-2 rounded-full p-2 transition-colors active:bg-gray-100"
      aria-label="뒤로가기"
    >
      <ChevronLeft size={28} className="text-gray-900" />
    </button>
  );
}
