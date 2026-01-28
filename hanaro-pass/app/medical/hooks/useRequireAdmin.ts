import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/useToast';

export function useRequireAdmin(error: string | null) {
  const router = useRouter();
  const { error: toastError } = useToast();

  useEffect(() => {
    if (error) {
      toastError('접근 권한 오류', error);
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [error, router, toastError]);
}
