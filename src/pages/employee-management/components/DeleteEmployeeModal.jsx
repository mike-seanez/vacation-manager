import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { useUser } from "domain/UseCases/userCases/useUser";

const DeleteEmployeeModal = ({ isOpen, onClose, onSuccessDelete, employee = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteUser } = useUser();

  const onAcceptDelete = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    try {
      await deleteUser(employee?.id);
      onSuccessDelete(employee?.id);
      onClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert("Error al eliminar el empleado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Eliminar Empleado</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>

        <div className="p-6">
          <p className="text-foreground">¿Estás seguro de que deseas eliminar al empleado {employee?.full_name}?</p>
          <div className="flex justify-end mt-6">
            <Button
              variant="danger"
              onClick={onAcceptDelete}
              isLoading={isLoading}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;