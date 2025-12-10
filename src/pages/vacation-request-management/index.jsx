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
import { useGetUser } from '../../hooks/useGetUser';
import { useVacationsRequest } from 'domain/UseCases/vacationCases/useVacationRequest';
import { useDepartment } from 'domain/UseCases/departmentCases/useDepartment';

const VacationRequestManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const currentUser = useGetUser();
  const { getAllVacations, acceptVacationRequest, rejectVacationRequest } = useVacationsRequest();
  const { getDepartments } = useDepartment();
  const [requests, setRequests] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    department: '',
    dateFrom: '',
    dateTo: '',
    submissionDateFrom: '',
    submissionDateTo: ''
  });

  useEffect(() => {
    const fetchRequests = async () => {
      const requests = await getAllVacations();
      setRequests(requests);
      const departments = await getDepartments();
      setDepartments(departments);
    };
    fetchRequests();
  }, []);

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    let filtered = requests;

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
      pending: requests?.filter(r => r?.status === 'pending')?.length,
      approved: requests?.filter(r => r?.status === 'approved')?.length,
      denied: requests?.filter(r => r?.status === 'denied')?.length,
      all: requests?.length
    };
  }, [requests]);

  // Calculate stats
  const stats = useMemo(() => {
    const currentMonth = new Date()?.getMonth();
    const currentYear = new Date()?.getFullYear();
    
    const approvedThisMonth = requests?.filter(request => {
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
  }, [requests, requestCounts]);

  const handleApprove = async (requestId, comment = '') => {
    await acceptVacationRequest(requestId);
    setSelectedRequests(selectedRequests?.filter(id => id !== requestId));
  };

  const handleDeny = async (requestId, comment = '') => {
    await rejectVacationRequest(requestId);
    setSelectedRequests(selectedRequests?.filter(id => id !== requestId));
  };

  // const handleBulkApprove = async (requestIds, comment = '') => {
  //   console.log('Bulk approving requests:', requestIds, 'with comment:', comment);
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500));
  // };

  // const handleBulkDeny = async (requestIds, comment = '') => {
  //   console.log('Bulk denying requests:', requestIds, 'with comment:', comment);
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500));
  // };

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


  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        user={currentUser}
      />
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={currentUser?.role_id}
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
          </div>

          {/* Stats Cards */}
          <RequestStats stats={stats} />

          {/* Quick Actions */}
          <QuickActionPanel userRole="admin" />

          {/* Filters */}
          {/* <RequestFilters
            activeTab={activeTab}
            onTabChange={setActiveTab}
            filters={filters}
            onFiltersChange={setFilters}
            requestCounts={requestCounts}
            departments={departments}
          /> */}

          {/* Bulk Actions */}
          {/* <BulkActionsPanel
            selectedRequests={selectedRequests}
            onBulkApprove={handleBulkApprove}
            onBulkDeny={handleBulkDeny}
            onClearSelection={handleClearSelection}
          /> */}

          {/* Requests Table */}
          {requests?.length > 0 && (
            <RequestTable
              requests={requests}
              onApprove={handleApprove}
              onDeny={handleDeny}
              onViewDetails={handleViewDetails}
              selectedRequests={selectedRequests}
              onSelectRequest={handleSelectRequest}
              onSelectAll={handleSelectAll}
            />
          )}

          {/* Empty State */}
          {/* {filteredRequests?.length === 0 && (
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
          )} */}
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
