import React, { useState, useEffect } from "react";
import NavigationHeader from "../../components/ui/NavigationHeader";
import RoleBasedSidebar from "../../components/ui/RoleBasedSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickActionPanel";
import MetricsCard from "./components/MetricsCard";
import RecentVacationRequests from "./components/RecentVacationRequests";
import QuickAddEmployee from "./components/QuickAddEmployee";
import RecentBlogActivity from "./components/RecentBlogActivity";
import SystemNotifications from "./components/SystemNotifications";
import VacationUsageChart from "./components/VacationUsageChart";
import { useGetUser, useGetAllUsers, useGetAllNewUsersThisMonth } from "../../hooks/useGetUser";
import { useVacationsRequest } from "../../domain/UseCases/vacationCases/useVacationRequest";
import { useBlog } from "../../domain/UseCases/blogCases/useBlog";
import { useHoliday } from "../../domain/UseCases/holidayCases/useHoliday";

const AdministratorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentUser = useGetUser();
  const allUsers = useGetAllUsers();
  const newUsersThisMonth = useGetAllNewUsersThisMonth();
  const { getAllVacations } = useVacationsRequest();
  const { getBlogs } = useBlog();
  const { getHolidays } = useHoliday();
  const [pendingVacationRequests, setPendingVacationRequests] = useState([]);
  const [blogEntries, setBlogEntries] = useState([]);
  const [numOfBlogs, setNumOfBlogs] = useState(0);
  const [numOfHolidays, setNumOfHolidays] = useState(0);

  // const pendingVacationRequests = 0;
  // const pendingVacationRequests = vacationsRequests?.filter(request => request.status === 'pending');
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const vacations = await getAllVacations();
      setPendingVacationRequests(vacations?.filter(request => request?.status === 'pending') || []);

      const blogs = await getBlogs();
      setBlogEntries(blogs);
      setNumOfBlogs(blogs?.length || 0);

      const holidays = await getHolidays();
      setNumOfHolidays(holidays?.length || 0);
    };
    fetchData();
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
      value: allUsers?.length || 0,
      icon: "Users",
      trend: "up",
      trendValue: `+${newUsersThisMonth}`,
      color: "primary",
    },
    {
      title: "Solicitudes Pendientes",
      value: pendingVacationRequests?.length || 0,
      icon: "Clock",
      trend: "down",
      trendValue: "-3",
      color: "warning",
    },
    {
      title: "Entradas de Blog",
      value: numOfBlogs,
      icon: "FileText",
      trend: "up",
      trendValue: "+2",
      color: "success",
    },
    {
      title: "Días Festivos",
      value: numOfHolidays,
      icon: "Calendar",
      trend: "neutral",
      // trendValue: "1",
      color: "error",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader onMenuToggle={handleMenuToggle} user={currentUser} />
      {/* Sidebar */}
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        userRole={currentUser?.role_id}
      />
      {/* Main Content */}
      <main
        className={`pt-16 transition-layout ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"
        }`}
      >
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
                  Bienvenido de vuelta, {currentUser?.full_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentTime?.toLocaleDateString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {currentTime?.toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
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
            <div className="lg:col-span-6">
              <RecentVacationRequests />
            </div>

            {/* Center Column - Quick Add & Blog Activity */}
            <div className="lg:col-span-6">
              {/* <QuickAddEmployee employees={allUsers} newUsersThisMonth={newUsersThisMonth} /> */}
              <RecentBlogActivity recentPosts={blogEntries} />
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-6">
            {/* <VacationUsageChart /> */}
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <p>
                © {new Date()?.getFullYear()} Corporativo CNI. Todos los
                derechos reservados.
              </p>
              <p>Versión 1.1.0 - Última actualización: 1 de septiembre, 2025</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdministratorDashboard;
