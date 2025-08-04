export type NotificationType = 'success' | 'warning' | 'error' | 'info';

export interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  className?: string;
}