import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'vacation_alert',
      title: "Balance de Vacaciones Bajo",
      message: "5 empleados tienen menos de 3 días de vacaciones disponibles",
      timestamp: new Date(Date.now() - 3600000),
      priority: 'high',
      read: false,
      actionable: true
    },
    {
      id: 2,
      type: 'holiday_reminder',
      title: "Día Festivo Próximo",
      message: "Día de la Constitución - 5 de febrero (en 7 días)",
      timestamp: new Date(Date.now() - 7200000),
      priority: 'medium',
      read: false,
      actionable: false
    },
    {
      id: 3,
      type: 'system_update',
      title: "Actualización del Sistema",
      message: "Nueva versión disponible con mejoras de seguridad",
      timestamp: new Date(Date.now() - 86400000),
      priority: 'low',
      read: true,
      actionable: true
    },
    {
      id: 4,
      type: 'pending_requests',
      title: "Solicitudes Pendientes",
      message: "8 solicitudes de vacaciones requieren aprobación",
      timestamp: new Date(Date.now() - 1800000),
      priority: 'high',
      read: false,
      actionable: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'vacation_alert': return 'AlertTriangle';
      case 'holiday_reminder': return 'Calendar';
      case 'system_update': return 'Download';
      case 'pending_requests': return 'Clock';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'hace un momento';
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev?.map(notif =>
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleAction = (notification) => {
    switch (notification?.type) {
      case 'vacation_alert': console.log('Navegar a gestión de empleados');
        break;
      case 'pending_requests': console.log('Navegar a solicitudes pendientes');
        break;
      case 'system_update': console.log('Iniciar actualización del sistema');
        break;
      default:
        console.log('Acción por defecto');
    }
    markAsRead(notification?.id);
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" iconName="Settings">
          Configurar
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`border border-border rounded-lg p-4 transition-smooth hover:bg-muted/50 ${
              !notification?.read ? 'bg-primary/5 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${getPriorityColor(notification?.priority)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification?.title}
                  </h4>
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {notification?.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(notification?.timestamp)}
                  </span>
                  
                  <div className="flex space-x-2">
                    {!notification?.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification?.id)}
                        className="text-xs"
                      >
                        Marcar leído
                      </Button>
                    )}
                    {notification?.actionable && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(notification)}
                        className="text-xs"
                      >
                        Ver
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" fullWidth iconName="Bell">
          Ver Todas las Notificaciones
        </Button>
      </div>
    </div>
  );
};

export default SystemNotifications;