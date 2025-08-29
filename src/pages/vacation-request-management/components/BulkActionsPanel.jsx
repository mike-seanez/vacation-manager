import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BulkActionsPanel = ({ 
  selectedRequests, 
  onBulkApprove, 
  onBulkDeny, 
  onClearSelection 
}) => {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkComment, setBulkComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (selectedRequests?.length === 0) {
    return null;
  }

  const handleBulkAction = (action) => {
    setBulkAction(action);
    setShowBulkModal(true);
  };

  const executeBulkAction = async () => {
    setIsProcessing(true);
    try {
      if (bulkAction === 'approve') {
        await onBulkApprove(selectedRequests, bulkComment);
      } else if (bulkAction === 'deny') {
        await onBulkDeny(selectedRequests, bulkComment);
      }
      setShowBulkModal(false);
      setBulkComment('');
      onClearSelection();
    } catch (error) {
      console.error('Error executing bulk action:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const BulkModal = () => {
    if (!showBulkModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
        <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">
              {bulkAction === 'approve' ? 'Aprobar Solicitudes' : 'Denegar Solicitudes'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBulkModal(false)}
              iconName="X"
              iconSize={20}
            >
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon 
                name={bulkAction === 'approve' ? 'CheckCircle' : 'AlertTriangle'} 
                size={20} 
                className={bulkAction === 'approve' ? 'text-success' : 'text-warning'} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {bulkAction === 'approve' 
                    ? `¿Aprobar ${selectedRequests?.length} solicitudes?`
                    : `¿Denegar ${selectedRequests?.length} solicitudes?`
                  }
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Esta acción no se puede deshacer. Se notificará a todos los empleados afectados.
                </p>
              </div>
            </div>

            <Input
              label="Comentarios (Opcional)"
              type="text"
              placeholder={`Agregar comentarios para la ${bulkAction === 'approve' ? 'aprobación' : 'denegación'}...`}
              value={bulkComment}
              onChange={(e) => setBulkComment(e?.target?.value)}
              description="Los comentarios serán visibles para todos los empleados seleccionados"
            />

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowBulkModal(false)}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant={bulkAction === 'approve' ? 'success' : 'destructive'}
                onClick={executeBulkAction}
                disabled={isProcessing}
                loading={isProcessing}
                iconName={bulkAction === 'approve' ? 'Check' : 'X'}
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                {bulkAction === 'approve' ? 'Aprobar Todas' : 'Denegar Todas'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedRequests?.length} solicitudes seleccionadas
              </p>
              <p className="text-xs text-muted-foreground">
                Realizar acciones en lote para múltiples solicitudes
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => handleBulkAction('approve')}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Aprobar Todas
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleBulkAction('deny')}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Denegar Todas
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              iconName="RotateCcw"
              iconSize={16}
            >
              <span className="sr-only">Limpiar selección</span>
            </Button>
          </div>
        </div>
      </div>
      <BulkModal />
    </>
  );
};

export default BulkActionsPanel;