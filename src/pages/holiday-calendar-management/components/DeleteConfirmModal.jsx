import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  holiday, 
  loading = false 
}) => {
  if (!isOpen || !holiday) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Eliminar Día Festivo
              </h2>
              <p className="text-sm text-muted-foreground">
                Esta acción no se puede deshacer
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            disabled={loading}
          >
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-foreground mb-4">
              ¿Estás seguro de que deseas eliminar el siguiente día festivo?
            </p>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <Icon 
                  name="Calendar" 
                  size={20} 
                  className="text-muted-foreground mt-0.5" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">
                    {holiday?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground capitalize mb-2">
                    {formatDate(holiday?.date)}
                  </p>
                  {holiday?.description && (
                    <p className="text-sm text-muted-foreground">
                      {holiday?.description}
                    </p>
                  )}
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      holiday?.type === 'national' ?'bg-red-100 text-red-800' :'bg-blue-100 text-blue-800'
                    }`}>
                      {holiday?.type === 'national' ? 'Nacional' : 'Empresa'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 mb-1">
                  Impacto en cálculos de vacaciones
                </h4>
                <p className="text-sm text-amber-700">
                  Al eliminar este día festivo, se recalcularán automáticamente 
                  todas las solicitudes de vacaciones pendientes y futuras que 
                  incluyan esta fecha.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              loading={loading}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
            >
              Eliminar Día Festivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;