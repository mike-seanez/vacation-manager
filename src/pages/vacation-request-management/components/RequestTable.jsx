import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RequestTable = ({ 
  requests, 
  onApprove, 
  onDeny, 
  onViewDetails,
  selectedRequests,
  onSelectRequest,
  onSelectAll
}) => {
  const [sortField, setSortField] = useState('submissionDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pendiente', className: 'bg-warning text-warning-foreground' },
      approved: { label: 'Aprobada', className: 'bg-success text-success-foreground' },
      denied: { label: 'Denegada', className: 'bg-destructive text-destructive-foreground' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.className}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateWorkingDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workingDays = 0;
    
    for (let d = new Date(start); d <= end; d?.setDate(d?.getDate() + 1)) {
      if (d?.getDay() !== 0) { // Exclude Sundays
        workingDays++;
      }
    }
    
    return workingDays;
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? "ArrowUp" : "ArrowDown"} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  if (requests?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center shadow-elevation-1">
        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No hay solicitudes de vacaciones
        </h3>
        <p className="text-muted-foreground">
          No se encontraron solicitudes que coincidan con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRequests?.length === requests?.length && requests?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Empleado
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/80 transition-smooth"
                onClick={() => handleSort('startDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Fechas de Vacaciones</span>
                  <SortIcon field="startDate" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Duración
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Motivo
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/80 transition-smooth"
                onClick={() => handleSort('submissionDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Fecha de Solicitud</span>
                  <SortIcon field="submissionDate" />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">
                Estado
              </th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests?.map((request) => (
              <tr key={request?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests?.includes(request?.id)}
                    onChange={(e) => onSelectRequest(request?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={request?.employee?.avatar}
                      alt={request?.employee?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {request?.employee?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {request?.employee?.department}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">
                    {formatDate(request?.startDate)} - {formatDate(request?.endDate)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-foreground">
                    {calculateWorkingDays(request?.startDate, request?.endDate)} días
                  </div>
                  <div className="text-xs text-muted-foreground">
                    (sin domingos)
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground max-w-xs truncate" title={request?.reason}>
                    {request?.reason}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">
                    {formatDate(request?.submissionDate)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(request?.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(request)}
                      iconName="Eye"
                      iconSize={16}
                    >
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                    {request?.status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => onApprove(request?.id)}
                          iconName="Check"
                          iconSize={16}
                        >
                          <span className="sr-only">Aprobar</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDeny(request?.id)}
                          iconName="X"
                          iconSize={16}
                        >
                          <span className="sr-only">Denegar</span>
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {requests?.map((request) => (
          <div key={request?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedRequests?.includes(request?.id)}
                  onChange={(e) => onSelectRequest(request?.id, e?.target?.checked)}
                  className="rounded border-border mt-1"
                />
                <Image
                  src={request?.employee?.avatar}
                  alt={request?.employee?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {request?.employee?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {request?.employee?.department}
                  </div>
                </div>
              </div>
              {getStatusBadge(request?.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fechas:</span>
                <span className="text-foreground">
                  {formatDate(request?.startDate)} - {formatDate(request?.endDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duración:</span>
                <span className="text-foreground">
                  {calculateWorkingDays(request?.startDate, request?.endDate)} días
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Solicitud:</span>
                <span className="text-foreground">
                  {formatDate(request?.submissionDate)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Motivo:</span>
                <p className="text-foreground mt-1">{request?.reason}</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(request)}
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
              >
                Ver Detalles
              </Button>
              {request?.status === 'pending' && (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onApprove(request?.id)}
                    iconName="Check"
                    iconSize={16}
                  >
                    <span className="sr-only">Aprobar</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeny(request?.id)}
                    iconName="X"
                    iconSize={16}
                  >
                    <span className="sr-only">Denegar</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestTable;