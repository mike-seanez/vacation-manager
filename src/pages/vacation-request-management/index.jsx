import React, { useState, useEffect, useMemo } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import RequestFilters from './components/RequestFilters';
import RequestTable from './components/RequestTable';
import RequestDetailsModal from './components/RequestDetailsModal';
import BulkActionsPanel from './components/BulkActionsPanel';
import RequestStats from './components/RequestStats';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const VacationRequestManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    dateFrom: '',
    dateTo: '',
    submissionDateFrom: '',
    submissionDateTo: ''
  });

  // Mock vacation requests data
  const mockRequests = [
    {
      id: 1,
      employee: {
        id: 101,
        name: 'María González Rodríguez',
        department: 'Recursos Humanos',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        joinDate: '2022-03-15',
        tenure: 20,
        availableVacationDays: 12,
        usedVacationDays: 6
      },
      startDate: '2024-09-15',
      endDate: '2024-09-26',
      reason: 'Vacaciones familiares programadas para visitar a mis padres en Guadalajara. He estado planeando este viaje durante varios meses.',
      submissionDate: '2024-08-20',
      status: 'pending'
    },
    {
      id: 2,
      employee: {
        id: 102,
        name: 'Carlos Alberto Mendoza',
        department: 'Tecnología',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        joinDate: '2021-07-10',
        tenure: 38,
        availableVacationDays: 18,
        usedVacationDays: 8
      },
      startDate: '2024-10-01',
      endDate: '2024-10-10',
      reason: 'Descanso personal y tiempo con la familia después de completar el proyecto de migración de sistemas.',
      submissionDate: '2024-08-25',
      status: 'pending'
    },
    {
      id: 3,
      employee: {
        id: 103,
        name: 'Ana Patricia Herrera',
        department: 'Ventas',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        joinDate: '2020-01-20',
        tenure: 56,
        availableVacationDays: 20,
        usedVacationDays: 15
      },
      startDate: '2024-07-08',
      endDate: '2024-07-19',
      reason: 'Vacaciones de verano con mi familia en Cancún.',
      submissionDate: '2024-06-15',
      status: 'approved',
      decisionDate: '2024-06-18',
      decisionBy: 'Roberto Martínez',
      decisionComment: 'Aprobado. Excelente desempeño en el trimestre.'
    },
    {
      id: 4,
      employee: {
        id: 104,
        name: 'Luis Fernando Castro',
        department: 'Marketing',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        joinDate: '2023-11-01',
        tenure: 10,
        availableVacationDays: 6,
        usedVacationDays: 2
      },
      startDate: '2024-09-20',
      endDate: '2024-09-27',
      reason: 'Necesito tiempo personal para asuntos familiares urgentes.',
      submissionDate: '2024-08-28',
      status: 'denied',
      decisionDate: '2024-08-30',
      decisionBy: 'Roberto Martínez',
      decisionComment: 'Denegado debido a antigüedad insuficiente (menos de 12 meses).'
    },
    {
      id: 5,
      employee: {
        id: 105,
        name: 'Sofía Elena Ramírez',
        department: 'Finanzas',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        joinDate: '2019-05-12',
        tenure: 64,
        availableVacationDays: 22,
        usedVacationDays: 10
      },
      startDate: '2024-11-15',
      endDate: '2024-11-29',
      reason: 'Vacaciones de fin de año para descansar y pasar tiempo con la familia durante las festividades.',
      submissionDate: '2024-08-30',
      status: 'pending'
    },
    {
      id: 6,
      employee: {
        id: 106,
        name: 'Diego Alejandro Torres',
        department: 'Operaciones',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        joinDate: '2022-09-05',
        tenure: 24,
        availableVacationDays: 14,
        usedVacationDays: 7
      },
      startDate: '2024-08-12',
      endDate: '2024-08-23',
      reason: 'Vacaciones de verano con mi esposa en Puerto Vallarta.',
      submissionDate: '2024-07-10',
      status: 'approved',
      decisionDate: '2024-07-12',
      decisionBy: 'Roberto Martínez',
      decisionComment: 'Aprobado. Buen timing y disponibilidad del equipo.'
    }
  ];

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    let filtered = mockRequests;

    // Filter by status tab
    if (activeTab !== 'all') {
      filtered = filtered?.filter(request => request?.status === activeTab);
    }

    // Apply search filter
    if (filters?.search) {
      filtered = filtered?.filter(request =>
        request?.employee?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Apply department filter
    if (filters?.department) {
      filtered = filtered?.filter(request =>
        request?.employee?.department?.toLowerCase()?.includes(filters?.department?.toLowerCase())
      );
    }

    // Apply date filters
    if (filters?.dateFrom) {
      filtered = filtered?.filter(request =>
        new Date(request.startDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(request =>
        new Date(request.endDate) <= new Date(filters.dateTo)
      );
    }

    if (filters?.submissionDateFrom) {
      filtered = filtered?.filter(request =>
        new Date(request.submissionDate) >= new Date(filters.submissionDateFrom)
      );
    }

    if (filters?.submissionDateTo) {
      filtered = filtered?.filter(request =>
        new Date(request.submissionDate) <= new Date(filters.submissionDateTo)
      );
    }

    return filtered;
  }, [activeTab, filters]);

  // Calculate request counts
  const requestCounts = useMemo(() => {
    return {
      pending: mockRequests?.filter(r => r?.status === 'pending')?.length,
      approved: mockRequests?.filter(r => r?.status === 'approved')?.length,
      denied: mockRequests?.filter(r => r?.status === 'denied')?.length,
      all: mockRequests?.length
    };
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const currentMonth = new Date()?.getMonth();
    const currentYear = new Date()?.getFullYear();
    
    const approvedThisMonth = mockRequests?.filter(request => {
      if (request?.status !== 'approved' || !request?.decisionDate) return false;
      const decisionDate = new Date(request.decisionDate);
      return decisionDate?.getMonth() === currentMonth && decisionDate?.getFullYear() === currentYear;
    })?.length;

    return {
      pending: requestCounts?.pending,
      approvedThisMonth,
      averageResponseTime: 2.5,
      total: requestCounts?.all
    };
  }, [requestCounts]);

  const handleApprove = async (requestId, comment = '') => {
    console.log('Approving request:', requestId, 'with comment:', comment);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleDeny = async (requestId, comment = '') => {
    console.log('Denying request:', requestId, 'with comment:', comment);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleBulkApprove = async (requestIds, comment = '') => {
    console.log('Bulk approving requests:', requestIds, 'with comment:', comment);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleBulkDeny = async (requestIds, comment = '') => {
    console.log('Bulk denying requests:', requestIds, 'with comment:', comment);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleSelectRequest = (requestId, isSelected) => {
    if (isSelected) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests?.filter(id => id !== requestId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedRequests(filteredRequests?.map(request => request?.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleClearSelection = () => {
    setSelectedRequests([]);
  };

  const handleExportReport = () => {
    console.log('Exporting vacation requests report...');
    // Simulate report generation
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        user={{ name: 'Roberto Martínez', email: 'roberto.martinez@vacablog.com' }}
      />
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole="admin"
      />
      <main className={`
        transition-layout pt-16
        ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}
      `}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <BreadcrumbTrail />
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Calendar" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Gestión de Solicitudes de Vacaciones
                  </h1>
                  <p className="text-muted-foreground">
                    Revisar y aprobar solicitudes de vacaciones de empleados
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleExportReport}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Exportar Reporte
              </Button>
              
              <Button
                variant="default"
                onClick={() => console.log('Send reminders')}
                iconName="Bell"
                iconPosition="left"
                iconSize={16}
              >
                Enviar Recordatorios
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <RequestStats stats={stats} />

          {/* Quick Actions */}
          <QuickActionPanel userRole="admin" />

          {/* Filters */}
          <RequestFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filters={filters}
            onFiltersChange={setFilters}
            requestCounts={requestCounts}
          />

          {/* Bulk Actions */}
          <BulkActionsPanel
            selectedRequests={selectedRequests}
            onBulkApprove={handleBulkApprove}
            onBulkDeny={handleBulkDeny}
            onClearSelection={handleClearSelection}
          />

          {/* Requests Table */}
          <RequestTable
            requests={filteredRequests}
            onApprove={handleApprove}
            onDeny={handleDeny}
            onViewDetails={handleViewDetails}
            selectedRequests={selectedRequests}
            onSelectRequest={handleSelectRequest}
            onSelectAll={handleSelectAll}
          />

          {/* Empty State */}
          {filteredRequests?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Calendar" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No se encontraron solicitudes
              </h3>
              <p className="text-muted-foreground mb-6">
                No hay solicitudes de vacaciones que coincidan con los filtros seleccionados.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({
                    search: '',
                    department: '',
                    dateFrom: '',
                    dateTo: '',
                    submissionDateFrom: '',
                    submissionDateTo: ''
                  });
                  setActiveTab('all');
                }}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* Request Details Modal */}
      <RequestDetailsModal
        request={selectedRequest}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedRequest(null);
        }}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </div>
  );
};

export default VacationRequestManagement;