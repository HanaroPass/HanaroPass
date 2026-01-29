import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAlert } from '@/providers/alertProvider';

export function useRequireAdmin(error: string | null) {
  const router = useRouter();
  const { alert } = useAlert();

  useEffect(() => {
    if (error) {
      alert({
        title: '접근 권한 제한',
        description: error || '이 페이지에 접근할 권한이 없습니다.',
        actionLabel: '돌아가기',
        hideCancel: true, // 취소 버튼은 필요 없음
        onAction: () => {
          // 확인을 눌렀을 때만 이동
          if (window.history.length > 1) {
            router.back();
          } else {
            router.replace('/'); // replace를 써서 히스토리에서 제거
          }
        },
      });
    }
  }, [error, router, alert]);
}
