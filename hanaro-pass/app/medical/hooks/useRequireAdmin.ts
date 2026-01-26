import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRequireAdmin(error: string | null) {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      if (error.includes('로그인')) {
        alert('로그인이 필요한 서비스입니다.');
      } else if (error.includes('권한')) {
        alert('관리자 권한이 없습니다.');
      } else {
        alert(error);
      }
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  }, [error, router]);
}
