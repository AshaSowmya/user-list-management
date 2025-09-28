import { toastRef } from './ToastProvider.tsx';

type ToastType = 'success' | 'error' | 'warning';

export const showToast = (
  message: string,
  type: ToastType = 'success',
  summary?: string
) => {
  if (!toastRef.current) return;

  toastRef.current.show({
    severity: type,
    summary: summary || (type === 'success' ? 'Success' : 'Error'),
    detail: message,
    life: 3000,
     style: {
      backgroundColor: 'white', 
      color: 'black',           
    },
  });
};
