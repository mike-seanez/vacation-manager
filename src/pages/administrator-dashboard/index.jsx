import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import MetricsCard from './components/MetricsCard';
import RecentVacationRequests from './components/RecentVacationRequests';
import QuickAddEmployee from './components/QuickAddEmployee';
import RecentBlogActivity from './components/RecentBlogActivity';
import SystemNotifications from './components/SystemNotifications';
import VacationUsageChart from './components/VacationUsageChart';

const AdministratorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock user data // TODO: Construct this item through the API 
  const currentUser = {
    name: "Administrador Sistema",
    email: "admin@vacablog.com",
    role: "admin"
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Empleados",
      value: "247",
      icon: "Users",
      trend: "up",
      trendValue: "+12",
      color: "primary"
    },
    {
      title: "Solicitudes Pendientes",
      value: "8",
      icon: "Clock",
      trend: "down",
      trendValue: "-3",
      color: "warning"
    },
    {
      title: "Entradas de Blog",
      value: "24",
      icon: "FileText",
      trend: "up",
      trendValue: "+2",
      color: "success"
    },
    {
      title: "Días Festivos",
      value: "15",
      icon: "Calendar",
      trend: "neutral",
      trendValue: "0",
      color: "error"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader 
        onMenuToggle={handleMenuToggle}
        user={currentUser}
      />
      {/* Sidebar */}
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        userRole={currentUser?.role}
      />
      {/* Main Content */}
      <main className={`pt-16 transition-layout ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <BreadcrumbTrail />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Panel de Administración
                </h1>
                <p className="text-muted-foreground mt-1">
                  Bienvenido de vuelta, {currentUser?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentTime?.toLocaleDateString('es-MX', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} - {currentTime?.toLocaleTimeString('es-MX', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActionPanel userRole={currentUser?.role} className="mb-6" />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Recent Vacation Requests */}
            <div className="lg:col-span-4">
              <RecentVacationRequests />
            </div>

            {/* Center Column - Quick Add & Blog Activity */}
            <div className="lg:col-span-4 space-y-6">
              <QuickAddEmployee />
              <RecentBlogActivity />
            </div>

            {/* Right Column - Notifications */}
            <div className="lg:col-span-4">
              <SystemNotifications />
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-6">
            <VacationUsageChart />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>© {new Date()?.getFullYear()} Corporativo CNI. Todos los derechos reservados.</p>
              <p>Versión 1.1.0 - Última actualización: 1 de septiembre, 2025</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdministratorDashboard;