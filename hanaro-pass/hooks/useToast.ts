import { toast } from 'sonner';

export const useToast = () => {
  const success = (message: string, description?: string) => {
    toast.success(message, {
      id: message,
      description,
    });
  };

  const error = (message: string, description?: string) => {
    toast.error(message, {
      id: message,
      description,
    });
  };

  return { success, error, info: toast.info, warning: toast.warning };
};
