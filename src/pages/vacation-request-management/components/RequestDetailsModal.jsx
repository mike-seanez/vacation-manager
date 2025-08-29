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
    return new Date(dateString)?.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateWorkingDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
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

  const { workingDays, sundays } = calculateWorkingDays(request?.startDate, request?.endDate);

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

  const mockVacationHistory = [
    {
      id: 1,
      year: 2024,
      startDate: '2024-07-15',
      endDate: '2024-07-26',
      days: 10,
      status: 'approved'
    },
    {
      id: 2,
      year: 2023,
      startDate: '2023-12-18',
      endDate: '2023-12-29',
      days: 8,
      status: 'approved'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={request?.employee?.avatar}
              alt={request?.employee?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Solicitud de Vacaciones
              </h2>
              <p className="text-muted-foreground">
                {request?.employee?.name} - {request?.employee?.department}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        {formatDate(request?.startDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Fecha de Fin
                      </label>
                      <p className="text-foreground font-medium">
                        {formatDate(request?.endDate)}
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
                      {formatDate(request?.submissionDate)}
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
                        {formatDate(request?.employee?.joinDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Antigüedad
                      </label>
                      <p className="text-foreground font-medium">
                        {request?.employee?.tenure}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Días Disponibles
                      </label>
                      <p className="text-lg font-bold text-success">
                        {request?.employee?.availableVacationDays}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Días Utilizados
                      </label>
                      <p className="text-lg font-semibold text-muted-foreground">
                        {request?.employee?.usedVacationDays}
                      </p>
                    </div>
                  </div>

                  {/* Validation Warnings */}
                  {request?.employee?.tenure < 12 && (
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
                  )}

                  {request?.employee?.availableVacationDays < workingDays && (
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

            {/* Vacation History */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Historial de Vacaciones
                </h3>
                
                <div className="space-y-3">
                  {mockVacationHistory?.map((vacation) => (
                    <div key={vacation?.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          Año {vacation?.year}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-success-foreground">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Aprobada
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(vacation?.startDate)} - {formatDate(vacation?.endDate)}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {vacation?.days} días utilizados
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Section */}
              {request?.status === 'pending' && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Decisión de Aprobación
                  </h3>
                  
                  <div className="space-y-4">
                    <Input
                      label="Comentarios (Opcional)"
                      type="text"
                      placeholder="Agregar comentarios sobre la decisión..."
                      value={comment}
                      onChange={(e) => setComment(e?.target?.value)}
                      description="Los comentarios serán visibles para el empleado"
                    />

                    <div className="flex space-x-3">
                      <Button
                        variant="success"
                        onClick={handleApprove}
                        disabled={isProcessing}
                        loading={isProcessing}
                        iconName="Check"
                        iconPosition="left"
                        iconSize={16}
                        className="flex-1"
                      >
                        Aprobar Solicitud
                      </Button>
                      
                      <Button
                        variant="destructive"
                        onClick={handleDeny}
                        disabled={isProcessing}
                        loading={isProcessing}
                        iconName="X"
                        iconPosition="left"
                        iconSize={16}
                        className="flex-1"
                      >
                        Denegar Solicitud
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Decision History */}
              {request?.status !== 'pending' && request?.decisionComment && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Decisión Registrada
                  </h3>
                  
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={request?.status === 'approved' ? 'CheckCircle' : 'XCircle'} 
                        size={16} 
                        className={request?.status === 'approved' ? 'text-success' : 'text-destructive'} 
                      />
                      <span className="font-medium text-foreground">
                        {request?.status === 'approved' ? 'Aprobada' : 'Denegada'} por {request?.decisionBy}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatDate(request?.decisionDate)}
                    </p>
                    <p className="text-foreground">
                      {request?.decisionComment}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;