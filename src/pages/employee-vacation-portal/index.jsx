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
import { useGetUser } from '../../hooks/useGetUser';
import { useVacationsBalance } from 'domain/UseCases/vacationCases/useVacationBalance';
import { useVacationsRequest } from 'domain/UseCases/vacationCases/useVacationRequest';
import { useHoliday } from 'domain/UseCases/holidayCases/useHoliday';

const EmployeeVacationPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('request');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(null);
  const currentUser = useGetUser();
  const { getVacationBalance } = useVacationsBalance();
  const { checkVacationEligibility, getVacationsByUserId, createVacationRequest } = useVacationsRequest();
  const { getHolidays } = useHoliday();
  const [vacationBalance, setVacationBalance] = useState(null);
  const [employeeEligibility, setEmployeeEligibility] = useState(null);
  const [vacationRequests, setVacationRequests] = useState(null);
  const [quickStats, setQuickStats] = useState(null);
  const [companyHolidays, setCompanyHolidays] = useState(null);

  useEffect(() => {
    const getValues = async() => {      
      const balance = await getVacationBalance();
      const normalizedBalance = balance ? {
        id: balance?.id,
        user_id: balance?.user_id ?? balance?.userId,
        year: balance?.year,
        available_days: balance?.available_days ?? balance?.availableDays,
        used_days: balance?.used_days ?? balance?.usedDays,
        updated_at: balance?.updated_at ?? balance?.updatedAt,
      } : null;
      setVacationBalance(normalizedBalance);

      const eligibility = await checkVacationEligibility();
      const normalizedEligibility = eligibility ? {
        joinDate: eligibility?.joinDate ?? eligibility?.join_date,
        monthsEmployed: eligibility?.monthsEmployed ?? eligibility?.months_employed,
        isEligible: (eligibility?.isEligible ?? eligibility?.isElegible) === true,
        nextEligibilityDate: eligibility?.nextEligibilityDate ?? eligibility?.next_eligibility_date ?? null,
      } : null;
      setEmployeeEligibility(normalizedEligibility);

      const requests = await getVacationsByUserId(currentUser.id);
      setVacationRequests(requests);
      const stats = {
        totalRequests: requests?.length,
        approvedRequests: requests?.filter(request => request.status === 'approved')?.length,
        pendingRequests: requests?.filter(request => request.status === 'pending')?.length,
        deniedRequests: requests?.filter(request => request.status === 'denied')?.length,
      };
      setQuickStats(stats);

      const holidays = await getHolidays();
      setCompanyHolidays(holidays);
    }
    getValues();
  }, [currentUser]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleVacationRequest = async (requestData) => {
    setPendingRequest({ ...requestData, user_id: currentUser.id });
    setShowConfirmDialog(true);
  };

  const confirmVacationRequest = async () => {
    try {
      await createVacationRequest(pendingRequest);      
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
        userRole={currentUser?.role_id}
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
            {employeeEligibility ? (
              <EligibilityChecker employeeData={employeeEligibility} />
            ) : (
              <div className="bg-muted/30 border border-border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2 mb-1" />
                <div className="h-3 bg-muted rounded w-2/5" />
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <QuickActionPanel userRole={currentUser?.role_id} className="mb-6" />

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
              {employeeEligibility?.isEligible && typeof vacationBalance?.available_days === 'number' && (
                <VacationRequestForm
                  availableDays={vacationBalance?.available_days}
                  onSubmit={handleVacationRequest}
                  companyHolidays={companyHolidays}
                />
              )}
              
              <RequestHistoryTable requests={vacationRequests} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
            {vacationBalance && <VacationBalanceCard balanceData={vacationBalance} /> }
              {quickStats && <QuickStats stats={quickStats} />}
            </div>
          </div>

          {/* Mobile Content */}
          <div className="lg:hidden">
            {activeTab === 'request' && employeeEligibility?.isEligible && typeof vacationBalance?.availableDays === 'number' && (
              <VacationRequestForm
                availableDays={vacationBalance?.availableDays}
                onSubmit={handleVacationRequest}
                companyHolidays={companyHolidays}
              />
            )}
            
            {activeTab === 'balance' && (
              vacationBalance ? (
                <VacationBalanceCard balanceData={vacationBalance} />
              ) : (
                <div className="bg-muted/30 border border-border rounded-lg p-4 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2 mb-1" />
                  <div className="h-3 bg-muted rounded w-2/5" />
                </div>
              )
            )}
            
            {activeTab === 'history' && (
              <RequestHistoryTable requests={vacationHistory} />
            )}
            
            {activeTab === 'stats' && quickStats && (
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
