import React from 'react';
import { Notification } from './Notification';

interface BaseNotificationProps {
  title: string;
  message: string;
  className?: string;
}

export const SuccessNotification: React.FC<BaseNotificationProps> = ({ title, message, className }) => (
  <Notification type="success" title={title} message={message} className={className} />
);

export const WarningNotification: React.FC<BaseNotificationProps> = ({ title, message, className }) => (
  <Notification type="warning" title={title} message={message} className={className} />
);

export const ErrorNotification: React.FC<BaseNotificationProps> = ({ title, message, className }) => (
  <Notification type="error" title={title} message={message} className={className} />
);

export const InfoNotification: React.FC<BaseNotificationProps> = ({ title, message, className }) => (
  <Notification type="info" title={title} message={message} className={className} />
);