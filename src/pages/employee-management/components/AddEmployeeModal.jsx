import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AddEmployeeModal = ({ isOpen, onClose, onSave, departments = [] }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    joinDate: '',
    position: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    department: '',
    employeeId: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const departmentOptions = departments?.map(dept => ({ value: dept, label: dept }));

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!formData?.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today?.getFullYear() - birthDate?.getFullYear();
      if (age < 18) {
        newErrors.birthDate = 'El empleado debe ser mayor de 18 años';
      }
    }

    if (!formData?.joinDate) {
      newErrors.joinDate = 'La fecha de ingreso es requerida';
    }

    if (!formData?.position?.trim()) {
      newErrors.position = 'El puesto es requerido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData?.username?.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData?.department) {
      newErrors.department = 'El departamento es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Calculate vacation balance based on Mexican labor law
      const joinDate = new Date(formData.joinDate);
      const today = new Date();
      const yearsWorked = Math.floor((today - joinDate) / (365.25 * 24 * 60 * 60 * 1000));
      
      let vacationBalance = 0;
      if (yearsWorked >= 1) {
        // Mexican labor law: 12 days for first year, +2 days each year up to 4th year, then +2 every 5 years
        if (yearsWorked === 1) vacationBalance = 12;
        else if (yearsWorked <= 4) vacationBalance = 12 + (yearsWorked - 1) * 2;
        else vacationBalance = 18 + Math.floor((yearsWorked - 4) / 5) * 2;
      }

      const newEmployee = {
        ...formData,
        id: Date.now(),
        vacationBalance,
        status: 'active',
        nextAccrualDate: new Date(joinDate.getFullYear() + yearsWorked + 1, joinDate.getMonth(), joinDate.getDate()),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.fullName}`
      };

      await onSave(newEmployee);
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      birthDate: '',
      joinDate: '',
      position: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      department: '',
      employeeId: '',
      phone: '',
      address: ''
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Agregar Nuevo Empleado</h2>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre Completo *"
              type="text"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              error={errors?.fullName}
              placeholder="Ej: Juan Carlos Pérez López"
              required
            />

            <Input
              label="ID de Empleado"
              type="text"
              value={formData?.employeeId}
              onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
              placeholder="Ej: EMP001"
            />

            <Input
              label="Fecha de Nacimiento *"
              type="date"
              value={formData?.birthDate}
              onChange={(e) => handleInputChange('birthDate', e?.target?.value)}
              error={errors?.birthDate}
              required
            />

            <Input
              label="Fecha de Ingreso *"
              type="date"
              value={formData?.joinDate}
              onChange={(e) => handleInputChange('joinDate', e?.target?.value)}
              error={errors?.joinDate}
              required
            />

            <Input
              label="Puesto *"
              type="text"
              value={formData?.position}
              onChange={(e) => handleInputChange('position', e?.target?.value)}
              error={errors?.position}
              placeholder="Ej: Desarrollador Senior"
              required
            />

            <Select
              label="Departamento *"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleInputChange('department', value)}
              error={errors?.department}
              placeholder="Seleccionar departamento"
              required
            />

            <Input
              label="Email Corporativo *"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              placeholder="juan.perez@empresa.com"
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              placeholder="+52 55 1234 5678"
            />

            <Input
              label="Nombre de Usuario *"
              type="text"
              value={formData?.username}
              onChange={(e) => handleInputChange('username', e?.target?.value)}
              error={errors?.username}
              placeholder="jperez"
              required
            />

            <Input
              label="Contraseña Inicial *"
              type="password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              placeholder="Mínimo 6 caracteres"
              required
            />

            <Input
              label="Confirmar Contraseña *"
              type="password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              placeholder="Repetir contraseña"
              required
            />
          </div>

          <Input
            label="Dirección"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            placeholder="Calle, Número, Colonia, Ciudad, Estado, CP"
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

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              Crear Empleado
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;