import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RequestDetailsModal = ({ 
  request, 
  isOpen, 
  onClose, 
  onApprove, 
  onDeny 
}) => {
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !request) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date?.getDate() + 1);
    return date?.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateWorkingDays = (start_date, end_date) => {
    const start = new Date(start_date);
    const end = new Date(end_date);
    let workingDays = 0;
    let sundays = 0;
    
    for (let d = new Date(start); d <= end; d?.setDate(d?.getDate() + 1)) {
      if (d?.getDay() === 0) {
        sundays++;
      } else {
        workingDays++;
      }
    }
    
    return { workingDays, sundays };
  };

  const { workingDays, sundays } = calculateWorkingDays(request?.start_date, request?.end_date);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pendiente', className: 'bg-warning text-warning-foreground', icon: 'Clock' },
      approved: { label: 'Aprobada', className: 'bg-success text-success-foreground', icon: 'CheckCircle' },
      denied: { label: 'Denegada', className: 'bg-destructive text-destructive-foreground', icon: 'XCircle' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${config?.className}`}>
        <Icon name={config?.icon} size={14} />
        <span>{config?.label}</span>
      </span>
    );
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await onApprove(request?.id, comment);
      onClose();
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeny = async () => {
    setIsProcessing(true);
    try {
      await onDeny(request?.id, comment);
      onClose();
    } catch (error) {
      console.error('Error denying request:', error);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Solicitud de Vacaciones
              </h2>
              <p className="text-muted-foreground">
                {request?.user?.full_name} - {request?.user?.position}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(request?.status)}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            >
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Request Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Detalles de la Solicitud
                </h3>
                
                <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha de Inicio
                      </label>
                      <p className="text-foreground font-medium">
                        {formatDate(request?.start_date)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha de Fin
                      </label>
                      <p className="text-foreground font-medium">
                        {formatDate(request?.end_date)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Días Laborales
                      </label>
                      <p className="text-2xl font-bold text-primary">
                        {workingDays}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Domingos Excluidos
                      </label>
                      <p className="text-lg font-semibold text-muted-foreground">
                        {sundays}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Total de Días
                      </label>
                      <p className="text-lg font-semibold text-foreground">
                        {workingDays + sundays}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Motivo de la Solicitud
                    </label>
                    <p className="text-foreground mt-1 p-3 bg-background rounded border border-border">
                      {request?.reason}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Fecha de Solicitud
                    </label>
                    <p className="text-foreground font-medium">
                      {formatDate(request?.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Employee Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Información del Empleado
                </h3>
                
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha de Ingreso
                      </label>
                      <p className="text-foreground font-medium">
                        {formatDate(request?.user?.join_date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Días Disponibles
                      </label>
                      <p className="text-lg font-bold text-success">
                        {request?.user?.vacation_balances[0]?.available_days}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Días Utilizados
                      </label>
                      <p className="text-lg font-semibold text-muted-foreground">
                        {request?.user?.vacation_balances[0]?.used_days}
                      </p>
                    </div>
                  </div>

                  {/* Validation Warnings */}
                  {/* {request?.user?.tenure < 12 && (
                    <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-warning">
                          Advertencia: Antigüedad Insuficiente
                        </p>
                        <p className="text-xs text-warning/80">
                          El empleado tiene menos de 12 meses de antigüedad según la ley laboral mexicana.
                        </p>
                      </div>
                    </div>
                  )} */}

                  {request?.user?.vacation_balances?.available_days < workingDays && (
                    <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-destructive">
                          Error: Días Insuficientes
                        </p>
                        <p className="text-xs text-destructive/80">
                          La solicitud excede los días de vacaciones disponibles.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;