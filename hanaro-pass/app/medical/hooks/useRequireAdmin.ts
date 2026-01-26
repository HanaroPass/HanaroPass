import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRequireAdmin(error: string | null) {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      alert('관리자가 아니므로 접근할 수 없습니다.');
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  }, [error, router]);
}
