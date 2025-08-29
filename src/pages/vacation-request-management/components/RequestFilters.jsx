import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const RequestFilters = ({ 
  activeTab, 
  onTabChange, 
  filters, 
  onFiltersChange,
  requestCounts = { pending: 0, approved: 0, denied: 0, all: 0 }
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const tabs = [
    { id: 'pending', label: 'Pendientes', count: requestCounts?.pending, color: 'bg-warning' },
    { id: 'approved', label: 'Aprobadas', count: requestCounts?.approved, color: 'bg-success' },
    { id: 'denied', label: 'Denegadas', count: requestCounts?.denied, color: 'bg-destructive' },
    { id: 'all', label: 'Todas', count: requestCounts?.all, color: 'bg-secondary' }
  ];

  const departmentOptions = [
    { value: '', label: 'Todos los departamentos' },
    { value: 'recursos-humanos', label: 'Recursos Humanos' },
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'ventas', label: 'Ventas' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'operaciones', label: 'Operaciones' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      department: '',
      dateFrom: '',
      dateTo: '',
      submissionDateFrom: '',
      submissionDateTo: ''
    });
    setShowAdvancedFilters(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }
            `}
          >
            <span>{tab?.label}</span>
            <span className={`
              inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full text-white
              ${activeTab === tab?.id ? 'bg-primary-foreground/20' : tab?.color}
            `}>
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Buscar por nombre de empleado..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="md:col-span-2"
        />
        
        <Select
          placeholder="Filtrar por departamento"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />
      </div>
      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          Filtros Avanzados
        </Button>

        {(filters?.search || filters?.department || filters?.dateFrom || filters?.dateTo || 
          filters?.submissionDateFrom || filters?.submissionDateTo) && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fecha de vacaciones desde
              </label>
              <Input
                type="date"
                value={filters?.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Fecha de vacaciones hasta
              </label>
              <Input
                type="date"
                value={filters?.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Solicitud enviada desde
              </label>
              <Input
                type="date"
                value={filters?.submissionDateFrom}
                onChange={(e) => handleFilterChange('submissionDateFrom', e?.target?.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Solicitud enviada hasta
              </label>
              <Input
                type="date"
                value={filters?.submissionDateTo}
                onChange={(e) => handleFilterChange('submissionDateTo', e?.target?.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestFilters;