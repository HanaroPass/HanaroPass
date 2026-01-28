import { useActionState, useEffect } from 'react';
import type { ActionResult } from '@/lib/errorHandler';

type UseDrawerFormProps<T> = {
  action: (
    prevState: ActionResult<T> | null,
    formData: FormData,
  ) => Promise<ActionResult<T>>;
  onSuccess?: (data: T) => void;
  onError?: (error: ActionResult<T>) => void;
  onOpenChange: (open: boolean) => void;
};

export function useDrawerForm<T>({
  action,
  onSuccess,
  onError,
  onOpenChange,
}: UseDrawerFormProps<T>) {
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (state.success && state.data) {
      onSuccess?.(state.data);
      onOpenChange(false);
    } else if (!state.success) {
      onError?.(state);
    }
  }, [state, onSuccess, onError, onOpenChange]);

  return {
    state,
    formAction,
    isPending,
  };
}
