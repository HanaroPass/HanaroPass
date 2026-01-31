'use client';

import { useRouter } from 'next/navigation';
import ActionButton from '@/components/ui/ActionButton';

export default function BottomMapButton() {
  const router = useRouter();
  return (
    <ActionButton
      className="h-14 w-full"
      text="지도로 돌아가기"
      onClick={() => router.push('/map')}
    />
  );
}
