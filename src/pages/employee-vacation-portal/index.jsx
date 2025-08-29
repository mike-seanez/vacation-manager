import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import VacationBalanceCard from './components/VacationBalanceCard';
import VacationRequestForm from './components/VacationRequestForm';
import RequestHistoryTable from './components/RequestHistoryTable';
import EligibilityChecker from './components/EligibilityChecker';
import QuickStats from './components/QuickStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmployeeVacationPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(null);

  // Mock user data - in real app this would come from authentication context
  const currentUser = {
    id: 1,
    name: "María González Hernández",
    email: "maria.gonzalez@vacablog.com",
    role: "employee",
    joinDate: "2023-03-15",
    position: "Desarrolladora Frontend",
    department: "Tecnología"
  };

  // Mock vacation balance data
  const vacationBalance = {
    earnedDays: 12,
    usedDays: 3,
    pendingDays: 2,
    availableDays: 7,
    nextEarnDate: "15 de marzo, 2025"
  };

  // Mock employee eligibility data
  const employeeEligibility = {
    joinDate: "2023-03-15",
    monthsEmployed: 17,
    isEligible: true,
    nextEligibilityDate: null
  };

  // Mock company holidays
  const companyHolidays = [
    "2024-12-25", // Christmas
    "2024-12-31", // New Year's Eve
    "2025-01-01", // New Year's Day
    "2025-02-05", // Constitution Day
    "2025-03-21", // Benito Juárez's Birthday
    "2025-05-01", // Labor Day
    "2025-09-16", // Independence Day
    "2025-11-20", // Revolution Day
  ];

  // Mock vacation request history
  const vacationHistory = [
    {
      id: 1,
      startDate: "2024-07-15",
      endDate: "2024-07-19",
      days: 5,
      reason: "Vacaciones familiares de verano",
      status: "approved",
      submittedAt: "2024-06-20T10:30:00Z",
      adminComment: "Aprobado. Disfruta tus vacaciones."
    },
    {
      id: 2,
      startDate: "2024-11-25",
      endDate: "2024-11-29",
      days: 5,
      reason: "Descanso de fin de año",
      status: "pending",
      submittedAt: "2024-10-15T14:20:00Z",
      adminComment: null
    },
    {
      id: 3,
      startDate: "2024-04-10",
      endDate: "2024-04-12",
      days: 3,
      reason: "Asuntos personales urgentes",
      status: "denied",
      submittedAt: "2024-03-25T09:15:00Z",
      adminComment: "Denegado por falta de cobertura en el proyecto."
    },
    {
      id: 4,
      startDate: "2024-02-14",
      endDate: "2024-02-16",
      days: 3,
      reason: "Celebración de aniversario",
      status: "approved",
      submittedAt: "2024-01-20T16:45:00Z",
      adminComment: "Aprobado. Felicidades."
    }
  ];

  // Mock quick stats
  const quickStats = {
    totalRequests: 4,
    approvedRequests: 2,
    pendingRequests: 1,
    deniedRequests: 1,
    averageResponseTime: 7
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleVacationRequest = async (requestData) => {
    setPendingRequest(requestData);
    setShowConfirmDialog(true);
  };

  const confirmVacationRequest = async () => {
    try {
      // Simulate API call
      console.log('Submitting vacation request:', pendingRequest);
      
      // In real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('¡Solicitud enviada exitosamente! Recibirás una notificación cuando sea revisada.');
      
      setShowConfirmDialog(false);
      setPendingRequest(null);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error al enviar la solicitud. Por favor intenta de nuevo.');
    }
  };

  const tabs = [
    { id: 'request', label: 'Solicitar Vacaciones', icon: 'Plus' },
    { id: 'balance', label: 'Mi Balance', icon: 'Wallet' },
    { id: 'history', label: 'Historial', icon: 'History' },
    { id: 'stats', label: 'Estadísticas', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        onMenuToggle={handleMenuToggle}
        user={currentUser}
      />
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        userRole={currentUser?.role}
      />
      <main className={`transition-layout pt-16 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'}`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <BreadcrumbTrail />
          
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Portal de Vacaciones</h1>
                <p className="text-muted-foreground mt-1">
                  Gestiona tus solicitudes de vacaciones y consulta tu balance disponible
                </p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="User" size={16} />
                <span>{currentUser?.name}</span>
                <span>•</span>
                <span>{currentUser?.position}</span>
              </div>
            </div>
          </div>

          {/* Eligibility Check */}
          <div className="mb-6">
            <EligibilityChecker employeeData={employeeEligibility} />
          </div>

          {/* Quick Actions */}
          <QuickActionPanel userRole={currentUser?.role} className="mb-6" />

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {employeeEligibility?.isEligible && (
                <VacationRequestForm
                  availableDays={vacationBalance?.availableDays}
                  onSubmit={handleVacationRequest}
                  companyHolidays={companyHolidays}
                />
              )}
              
              <RequestHistoryTable requests={vacationHistory} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <VacationBalanceCard balanceData={vacationBalance} />
              <QuickStats stats={quickStats} />
            </div>
          </div>

          {/* Mobile Content */}
          <div className="lg:hidden">
            {activeTab === 'request' && employeeEligibility?.isEligible && (
              <VacationRequestForm
                availableDays={vacationBalance?.availableDays}
                onSubmit={handleVacationRequest}
                companyHolidays={companyHolidays}
              />
            )}
            
            {activeTab === 'balance' && (
              <VacationBalanceCard balanceData={vacationBalance} />
            )}
            
            {activeTab === 'history' && (
              <RequestHistoryTable requests={vacationHistory} />
            )}
            
            {activeTab === 'stats' && (
              <QuickStats stats={quickStats} />
            )}
          </div>

          {/* Confirmation Dialog */}
          {showConfirmDialog && pendingRequest && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-500 p-4">
              <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full shadow-elevation-3">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="AlertCircle" size={24} className="text-warning" />
                  <h3 className="text-lg font-semibold text-foreground">Confirmar Solicitud</h3>
                </div>
                
                <div className="space-y-3 mb-6 text-sm">
                  <p className="text-foreground">
                    <strong>Fechas:</strong> {new Date(pendingRequest.startDate)?.toLocaleDateString('es-MX')} al {new Date(pendingRequest.endDate)?.toLocaleDateString('es-MX')}
                  </p>
                  <p className="text-foreground">
                    <strong>Días solicitados:</strong> {pendingRequest?.calculatedDays} días laborales
                  </p>
                  <p className="text-foreground">
                    <strong>Motivo:</strong> {pendingRequest?.reason}
                  </p>
                  <div className="bg-muted/50 rounded p-3">
                    <p className="text-xs text-muted-foreground">
                      Una vez enviada, tu solicitud será revisada por Recursos Humanos. Recibirás una notificación con la respuesta.
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowConfirmDialog(false);
                      setPendingRequest(null);
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="default"
                    onClick={confirmVacationRequest}
                    iconName="Send"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Confirmar Envío
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeVacationPortal;