import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EmployeeFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  departments = [],
  totalEmployees = 0,
  filteredCount = 0
}) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'suspended', label: 'Suspendido' }
  ];

  const departmentOptions = [
    { value: '', label: 'Todos los departamentos' },
    ...departments?.map(dept => ({ value: dept.id, label: dept?.name || dept }))
  ];

  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Filtros de Empleados</h3>
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredCount} de {totalEmployees} empleados
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Buscar por nombre, email o posición..."
            value={filters?.search}
            onChange={(e) => handleInputChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Department Filter */}
        <Select
          placeholder="Seleccionar departamento"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleInputChange('department', value)}
        />

        {/* Status Filter */}
        {/* <Select
          placeholder="Seleccionar estado"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleInputChange('status', value)}
        /> */}

        {/* Date Range Filters */}
        <Input
          type="date"
          label="Fecha de ingreso desde"
          value={filters?.joinDateFrom}
          onChange={(e) => handleInputChange('joinDateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="Fecha de ingreso hasta"
          value={filters?.joinDateTo}
          onChange={(e) => handleInputChange('joinDateTo', e?.target?.value)}
        />

        {/* Vacation Balance Filter */}
        <Input
          type="number"
          label="Balance mínimo (días)"
          placeholder="0"
          min="0"
          value={filters?.minVacationBalance}
          onChange={(e) => handleInputChange('minVacationBalance', e?.target?.value)}
        />

        <Input
          type="number"
          label="Balance máximo (días)"
          placeholder="30"
          min="0"
          value={filters?.maxVacationBalance}
          onChange={(e) => handleInputChange('maxVacationBalance', e?.target?.value)}
        />
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-medium text-muted-foreground mr-2">Filtros rápidos:</span>
        {/* <Button
          variant="outline"
          size="xs"
          onClick={() => onFilterChange({ ...filters, status: 'active' })}
        >
          Solo Activos
        </Button> */}
        <Button
          variant="outline"
          size="xs"
          onClick={() => onFilterChange({ ...filters, minVacationBalance: '10' })}
        >
          Balance &gt; 10 días
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => onFilterChange({ 
            ...filters, 
            joinDateFrom: new Date(new Date().getFullYear(), 0, 1)?.toISOString()?.split('T')?.[0]
          })}
        >
          Ingresados este año
        </Button>
      </div>
    </div>
  );
};

export default EmployeeFilters;