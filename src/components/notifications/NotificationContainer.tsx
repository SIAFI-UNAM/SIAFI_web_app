import React from 'react';
import { useNotifications } from './NotificationContext';
import { Notification } from './Notification';

interface NotificationContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
  maxNotifications?: number;
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4', 
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
};

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  position = 'top-right',
  className = '',
  maxNotifications = 5,
}) => {
  const { notifications, removeNotification } = useNotifications();

  // Mostrar solo las últimas notificaciones según el límite
  const visibleNotifications = notifications.slice(-maxNotifications);

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div 
      className={`
        fixed z-50 flex flex-col gap-3 w-80 max-w-sm
        ${positionClasses[position]}
        ${className}
      `}
    >
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className="relative group animate-in slide-in-from-right-full duration-300"
        >
          <Notification
            type={notification.type}
            title={notification.title}
            message={notification.message}
            className="shadow-lg border border-gray-200"
          />
          
          {/* Botón de cerrar */}
          <button
            onClick={() => removeNotification(notification.id)}
            className="
              absolute top-2 right-2 w-6 h-6 
              flex items-center justify-center
              bg-white/80 hover:bg-white
              rounded-full shadow-sm
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              text-gray-600 hover:text-gray-800
            "
            aria-label="Cerrar notificación"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;