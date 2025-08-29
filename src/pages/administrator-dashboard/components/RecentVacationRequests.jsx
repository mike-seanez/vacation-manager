import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentVacationRequests = () => {
  const recentRequests = [
    {
      id: 1,
      employeeName: "María González",
      employeeAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      department: "Recursos Humanos",
      requestDate: "2025-01-15",
      startDate: "2025-02-10",
      endDate: "2025-02-14",
      days: 5,
      reason: "Vacaciones familiares",
      status: "pending",
      urgency: "normal"
    },
    {
      id: 2,
      employeeName: "Carlos Rodríguez",
      employeeAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Desarrollo",
      requestDate: "2025-01-14",
      startDate: "2025-02-05",
      endDate: "2025-02-07",
      days: 3,
      reason: "Asuntos personales",
      status: "pending",
      urgency: "high"
    },
    {
      id: 3,
      employeeName: "Ana Martínez",
      employeeAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "Marketing",
      requestDate: "2025-01-13",
      startDate: "2025-03-01",
      endDate: "2025-03-10",
      days: 8,
      reason: "Vacaciones de primavera",
      status: "pending",
      urgency: "normal"
    }
  ];

  const handleApprove = (requestId) => {
    console.log(`Aprobar solicitud ${requestId}`);
  };

  const handleDeny = (requestId) => {
    console.log(`Denegar solicitud ${requestId}`);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-error';
      case 'normal': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Solicitudes Recientes</h3>
        <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
          Ver Todas
        </Button>
      </div>
      <div className="space-y-4">
        {recentRequests?.map((request) => (
          <div key={request?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={request?.employeeAvatar}
                  alt={request?.employeeName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-foreground">{request?.employeeName}</h4>
                  <p className="text-sm text-muted-foreground">{request?.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Clock" 
                  size={16} 
                  className={getUrgencyColor(request?.urgency)}
                />
                <span className="text-xs text-muted-foreground">
                  {new Date(request.requestDate)?.toLocaleDateString('es-MX')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Fechas:</span>
                <p className="font-medium text-foreground">
                  {new Date(request.startDate)?.toLocaleDateString('es-MX')} - {new Date(request.endDate)?.toLocaleDateString('es-MX')}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Días:</span>
                <p className="font-medium text-foreground">{request?.days} días</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Motivo:</span>
              <p className="text-sm text-foreground mt-1">{request?.reason}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleApprove(request?.id)}
                >
                  Aprobar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleDeny(request?.id)}
                >
                  Denegar
                </Button>
              </div>
              <Button variant="ghost" size="sm" iconName="MessageSquare">
                Comentar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVacationRequests;