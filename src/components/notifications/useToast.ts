import { useNotifications } from './NotificationContext';
import type { NotificationType } from './types';

export interface ToastOptions {
  title: string;
  message: string;
  duration?: number; 
}

export const useToast = () => {
  const { addNotification, removeNotification, clearAll } = useNotifications();

  const showNotification = (type: NotificationType, options: ToastOptions) => {
    return addNotification({
      type,
      title: options.title,
      message: options.message,
      duration: options.duration ?? 5000, 
    });
  };

  return {
    success: (options: ToastOptions) => showNotification('success', options),
    warning: (options: ToastOptions) => showNotification('warning', options),
    error: (options: ToastOptions) => showNotification('error', { 
      ...options, 
      duration: options.duration ?? 8000 
    }),
    info: (options: ToastOptions) => showNotification('info', options),
    
    dismiss: removeNotification,
    dismissAll: clearAll,
    
    show: showNotification,
  };
};