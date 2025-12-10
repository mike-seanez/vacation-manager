import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RequestHistoryTable = ({ requests = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 5;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'denied':
        return { icon: 'XCircle', color: 'text-destructive' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'denied':
        return 'Denegada';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const getStatusBadge = (status) => {
    const { icon, color } = getStatusIcon(status);
    const text = getStatusText(status);
    
    return (
      <div className={`flex items-center space-x-2 ${color}`}>
        <Icon name={icon} size={16} />
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  };

  const filteredRequests = requests?.filter(request => 
    filterStatus === 'all' || request?.status === filterStatus
  );

  const totalPages = Math.ceil(filteredRequests?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests?.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-foreground">Historial de Solicitudes</h2>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Filtrar:</span>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e?.target?.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobadas</option>
              <option value="denied">Denegadas</option>
            </select>
          </div>
        </div>
      </div>
      {paginatedRequests?.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {filterStatus === 'all' ? 'No hay solicitudes' : `No hay solicitudes ${getStatusText(filterStatus)?.toLowerCase()}s`}
          </h3>
          <p className="text-muted-foreground">
            {filterStatus === 'all' ?'Aún no has realizado ninguna solicitud de vacaciones.' :'No se encontraron solicitudes con este estado.'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Fechas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Días
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Solicitado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedRequests?.map((request) => (
                  <tr key={request?.id} className="hover:bg-muted/30 transition-smooth">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">
                        <div className="font-medium">{formatDate(request?.start_date)}</div>
                        <div className="text-muted-foreground">al {formatDate(request?.end_date)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-foreground">{request?.total_days} días</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request?.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground max-w-xs">
                        <p className="truncate" title={request?.reason}>
                          {request?.reason}
                        </p>
                        {request?.adminComment && (
                          <p className="text-xs text-muted-foreground mt-1" title={request?.adminComment}>
                            Comentario: {request?.adminComment}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(request?.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredRequests?.length)} de {filteredRequests?.length} solicitudes
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    iconName="ChevronLeft"
                    iconSize={16}
                  >
                    Anterior
                  </Button>
                  
                  <span className="text-sm text-foreground">
                    Página {currentPage} de {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    iconName="ChevronRight"
                    iconSize={16}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RequestHistoryTable;