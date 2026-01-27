import { useCallback } from 'react';
import { toast } from 'sonner';

// 서버 액션 결과에 대한 타입
interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

export const useToast = () => {
  // 등록 완료 전용 형식
  const registerSuccess = useCallback((title: string) => {
    toast.success(`${title} 등록 완료!`, {
      id: `reg-success-${title}`, // 중복 방지
      description: '정보를 안전하게 저장하였습니다.',
    });
  }, []);

  // 기본 에러 전용 형식
  const systemError = useCallback((target: string) => {
    toast.error(`${target} 처리에 실패했습니다.`, {
      id: `err-${target}`,
      description: '잠시 후 다시 시도하거나 고객센터에 문의해주세요.',
    });
  }, []);

  // 서버 에러 전용 핸들러
  const actionError = useCallback((result: ActionResult) => {
    const errorMessage = result?.error || result?.message;
    if (result && !result.success) {
      toast.error('요청 실패', {
        id: errorMessage || 'unknown-error',
        description: errorMessage || '처리 중 오류가 발생했습니다.',
      });
    }
  }, []);

  // 기본 메서드
  const success = useCallback((message: string, description?: string) => {
    toast.success(message, { id: message, description });
  }, []);

  const error = useCallback((message: string, description?: string) => {
    toast.error(message, { id: message, description });
  }, []);

  const info = useCallback((message: string, description?: string) => {
    toast.info(message, { id: message, description });
  }, []);

  const warning = useCallback((message: string, description?: string) => {
    toast.warning(message, { id: message, description });
  }, []);

  // 기본/커스텀 알림
  const message = useCallback((msg: string) => {
    toast(msg);
  }, []);

  return {
    registerSuccess,
    systemError,
    actionError,
    success,
    error,
    info,
    warning,
    message,
  };
};
