import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import AdministratorDashboard from './pages/administrator-dashboard';
import EmployeeManagement from './pages/employee-management';
import VacationRequestManagement from './pages/vacation-request-management';
import BlogManagement from './pages/blog-management';
import EmployeeVacationPortal from './pages/employee-vacation-portal';
import HolidayCalendarManagement from './pages/holiday-calendar-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/administrator-dashboard" element={<AdministratorDashboard />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/vacation-request-management" element={<VacationRequestManagement />} />
        <Route path="/blog-management" element={<BlogManagement />} />
        <Route path="/employee-vacation-portal" element={<EmployeeVacationPortal />} />
        <Route path="/holiday-calendar-management" element={<HolidayCalendarManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
