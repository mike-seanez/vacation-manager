import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ShowEmployeeModal = ({ isOpen, onClose, employee = {}, employees = [] }) => {
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(employee || {});
  }, [employee]);


  const roleOptions = [
    { value: 1, label: 'Administrador' },
    { value: 2, label: 'Recursos humanos' },
    { value: 3, label: 'Empleado'}
  ];

  const parseRoleOptions = (roleId) => {
    return roleOptions?.find(role => role?.value === roleId)?.label || 'Desconocido';
  };


  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Ver Empleado</h2>
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

        <form className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre Completo"
              type="text"
              value={formData?.full_name}
              error={errors?.full_name}
              placeholder="Ej: Juan Carlos Pérez López"
              readOnly
            />

            <Input
              label="ID de Empleado"
              type="text"
              value={formData?.employee_id}
              placeholder="Ej: EMP001"
              readOnly
            />

            <Input
              label="Fecha de Nacimiento"
              type="date"
              value={formData?.birth_date}
              error={errors?.birth_date}
              readOnly
            />

            <Input
              label="Fecha de Ingreso"
              type="date"
              value={formData?.join_date}
              error={errors?.join_date}
              readOnly
            />

            <Input
              label="Puesto"
              type="text"
              value={formData?.position}
              error={errors?.position}
              placeholder="Ej: Desarrollador Senior"
              readOnly
            />

            <Input
              label="Departamento"
              type="text"
              value={formData?.department_id}
              error={errors?.department_id}
              placeholder="Seleccionar departamento"
              readOnly  
            />

            <Input
              label="Email Corporativo"
              type="email"
              value={formData?.email}
              error={errors?.email}
              placeholder="juan.perez@empresa.com"
              readOnly
              
            />

            <Input
              label="Teléfono"
              type="tel"
              value={formData?.phone}
              placeholder="+52 55 1234 5678"
              readOnly
            />

            <Input
              label="Nombre de Usuario"
              type="text"
              value={formData?.username}
              error={errors?.username}
              placeholder="jperez"
              readOnly
            />

            <Input
              label="Persona encargada"
              value={employees?.find(emp => emp?.id === formData?.person_in_charge_id)?.full_name || 'Ninguno'}
              error={errors?.person_in_charge_id}
              placeholder="Seleccionar empleado"
              readOnly
            />
          </div>

          <Input
            label="Dirección"
            type="text"
            value={formData?.address}
            placeholder="Calle, Número, Colonia, Ciudad, Estado, CP"
            readOnly
          />

          <Input
            label="Rol"
            type="text"
            value={parseRoleOptions(formData?.role_id)}
            error={errors?.role_id}
            placeholder="Seleccionar rol"
            readOnly
          />

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Información sobre Balance Vacacional:</p>
                <p>El balance vacacional se calculará automáticamente según la Ley Federal del Trabajo mexicana:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>12 días después del primer año de servicio</li>
                  <li>14 días después del segundo año</li>
                  <li>16 días después del tercer año</li>
                  <li>18 días después del cuarto año</li>
                  <li>+2 días cada 5 años adicionales</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowEmployeeModal;
