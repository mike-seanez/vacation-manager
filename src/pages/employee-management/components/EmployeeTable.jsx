import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeTable = ({ 
  employees, 
  onEdit, 
  onView, 
  onPasswordReset, 
  onDeactivate,
  selectedEmployees,
  onSelectEmployee,
  onSelectAll 
}) => {
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEmployees = [...employees]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'joinDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success', text: 'text-success-foreground', label: 'Activo' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactivo' },
      suspended: { bg: 'bg-warning', text: 'text-warning-foreground', label: 'Suspendido' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-smooth"
    >
      <span>{children}</span>
      <Icon 
        name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
        size={14} 
      />
    </button>
  );

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedEmployees?.length === employees?.length}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton field="fullName">Nombre Completo</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton field="position">Puesto</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton field="department">Departamento</SortButton>
              </th>
              <th className="px-4 py-3 text-left">
                <SortButton field="joinDate">Fecha de Ingreso</SortButton>
              </th>
              <th className="px-4 py-3 text-left">Balance Vacacional</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedEmployees?.map((employee) => (
              <tr key={employee?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedEmployees?.includes(employee?.id)}
                    onChange={(e) => onSelectEmployee(employee?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={employee?.avatar}
                      alt={employee?.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{employee?.fullName}</div>
                      <div className="text-sm text-muted-foreground">{employee?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">{employee?.position}</td>
                <td className="px-4 py-3 text-foreground">{employee?.department}</td>
                <td className="px-4 py-3 text-foreground">{formatDate(employee?.joinDate)}</td>
                <td className="px-4 py-3">
                  <div className="text-foreground font-medium">{employee?.vacationBalance} días</div>
                  <div className="text-xs text-muted-foreground">
                    Próximo: {formatDate(employee?.nextAccrualDate)}
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(employee?.status)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(employee)}
                      iconName="Eye"
                      iconSize={16}
                    >
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(employee)}
                      iconName="Edit"
                      iconSize={16}
                    >
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPasswordReset(employee)}
                      iconName="Key"
                      iconSize={16}
                    >
                      <span className="sr-only">Restablecer contraseña</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeactivate(employee)}
                      iconName="UserX"
                      iconSize={16}
                      className="text-destructive hover:text-destructive"
                    >
                      <span className="sr-only">Desactivar</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedEmployees?.map((employee) => (
          <div key={employee?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedEmployees?.includes(employee?.id)}
                  onChange={(e) => onSelectEmployee(employee?.id, e?.target?.checked)}
                  className="rounded border-border mt-1"
                />
                <Image
                  src={employee?.avatar}
                  alt={employee?.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-foreground">{employee?.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{employee?.position}</p>
                </div>
              </div>
              {getStatusBadge(employee?.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-muted-foreground">Departamento:</span>
                <p className="text-foreground font-medium">{employee?.department}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Fecha de Ingreso:</span>
                <p className="text-foreground font-medium">{formatDate(employee?.joinDate)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Balance Vacacional:</span>
                <p className="text-foreground font-medium">{employee?.vacationBalance} días</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="text-foreground font-medium text-xs">{employee?.email}</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(employee)}
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
              >
                Ver
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(employee)}
                iconName="Edit"
                iconPosition="left"
                iconSize={14}
              >
                Editar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;