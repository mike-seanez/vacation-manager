import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsPanel = ({ 
  selectedEmployees, 
  onBulkAction, 
  onClearSelection 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'activate', label: 'Activar empleados' },
    { value: 'deactivate', label: 'Desactivar empleados' },
    { value: 'suspend', label: 'Suspender empleados' },
    { value: 'export', label: 'Exportar datos' },
    { value: 'reset-passwords', label: 'Restablecer contraseñas' },
    { value: 'send-notifications', label: 'Enviar notificaciones' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction || selectedEmployees?.length === 0) return;

    setIsLoading(true);
    try {
      await onBulkAction(selectedAction, selectedEmployees);
      setSelectedAction('');
    } catch (error) {
      console.error('Error executing bulk action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action) => {
    const iconMap = {
      activate: 'UserCheck',
      deactivate: 'UserX',
      suspend: 'UserMinus',
      export: 'Download',
      'reset-passwords': 'Key',
      'send-notifications': 'Bell'
    };
    return iconMap?.[action] || 'Settings';
  };

  const getActionVariant = (action) => {
    if (action === 'deactivate' || action === 'suspend') return 'destructive';
    if (action === 'activate') return 'success';
    return 'default';
  };

  if (selectedEmployees?.length === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedEmployees?.length} empleado{selectedEmployees?.length !== 1 ? 's' : ''} seleccionado{selectedEmployees?.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Seleccionar acción"
              className="min-w-48"
            />

            <Button
              variant={getActionVariant(selectedAction)}
              size="sm"
              onClick={handleExecuteAction}
              disabled={!selectedAction || isLoading}
              loading={isLoading}
              iconName={selectedAction ? getActionIcon(selectedAction) : 'Settings'}
              iconPosition="left"
              iconSize={16}
            >
              Ejecutar
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Limpiar Selección
          </Button>
        </div>
      </div>
      {/* Action Preview */}
      {selectedAction && (
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Vista previa de la acción:</p>
              <p className="text-muted-foreground">
                {selectedAction === 'activate' && `Se activarán ${selectedEmployees?.length} empleados seleccionados.`}
                {selectedAction === 'deactivate' && `Se desactivarán ${selectedEmployees?.length} empleados seleccionados.`}
                {selectedAction === 'suspend' && `Se suspenderán ${selectedEmployees?.length} empleados seleccionados.`}
                {selectedAction === 'export' && `Se exportarán los datos de ${selectedEmployees?.length} empleados seleccionados.`}
                {selectedAction === 'reset-passwords' && `Se restablecerán las contraseñas de ${selectedEmployees?.length} empleados seleccionados.`}
                {selectedAction === 'send-notifications' && `Se enviarán notificaciones a ${selectedEmployees?.length} empleados seleccionados.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActionsPanel;