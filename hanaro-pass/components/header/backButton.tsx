'use client';

import { ChevronLeft } from 'lucide-react';

export default function BackButton({ onBack }: { onBack?: () => void }) {
  return (
    <button
      onClick={onBack}
      className="-ml-2 rounded-full p-2 transition-colors active:bg-gray-100"
      aria-label="뒤로가기"
    >
      <ChevronLeft size={28} className="text-gray-900" />
    </button>
  );
}
