import { useActionState, useEffect } from 'react';
import type { ActionResult } from '@/lib/errorHandler';

type UseDrawerFormProps<T> = {
  action: (
    prevState: ActionResult<T> | null,
    formData: FormData,
  ) => Promise<ActionResult<T>>;
  onSuccess?: () => void;
  onOpenChange: (open: boolean) => void;
};

export function useDrawerForm<T>({
  action,
  onSuccess,
  onOpenChange,
}: UseDrawerFormProps<T>) {
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
      onOpenChange(false);
    }
  }, [state, onSuccess, onOpenChange]);

  return {
    state,
    formAction,
    isPending,
  };
}
