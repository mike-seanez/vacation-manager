import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useUser } from 'domain/UseCases/userCases/useUser';

const QuickAddEmployee = ({ employees, newUsersThisMonth }) => {
  const { createUser } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: '',
    department: '',
    username: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Recursos Humanos',
    'Desarrollo',
    'Marketing',
    'Ventas',
    'Finanzas',
    'Operaciones'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createUser({
        fullName: formData?.fullName,
        email: formData?.email,
        position: formData?.position,
        department: formData?.department,
        username: formData?.username
      });
      console.log('Empleado agregado:', formData);
      setFormData({
        fullName: '',
        email: '',
        position: '',
        department: '',
        username: ''
      });
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error al agregar empleado:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Agregar Empleado Rápido</h3>
        <Icon name="UserPlus" size={20} className="text-primary" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre Completo"
          type="text"
          name="fullName"
          placeholder="Ej: María González López"
          value={formData?.fullName}
          onChange={handleInputChange}
          required
        />

        <Input 
        label="Nombre de usuario"
        type="text"
        name="username"
        placeholder="Ej: maria_gonzalez"
        value={formData?.username}
        onChange={handleInputChange}
        required
        />

        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="maria.gonzalez@empresa.com"
          value={formData?.email}
          onChange={handleInputChange}
          required
        />

        <Input
          label="Puesto"
          type="text"
          name="position"
          placeholder="Ej: Desarrollador Senior"
          value={formData?.position}
          onChange={handleInputChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Departamento
          </label>
          <select
            name="department"
            value={formData?.department}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option value="">Seleccionar departamento</option>
            {departments?.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3 pt-2">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Plus"
            iconPosition="left"
            className="flex-1"
          >
            Agregar Empleado
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="Settings"
            onClick={() => console.log('Configuración avanzada')}
          >
            Avanzado
          </Button>
        </div>
      </form>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Empleados nuevos este mes:</span>
          <span className="font-medium text-foreground">{newUsersThisMonth || 0}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Total empleados:</span>
          <span className="font-medium text-foreground">{employees?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickAddEmployee;