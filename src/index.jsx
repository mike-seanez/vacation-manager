import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/tailwind.css";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import NotFound from "pages/NotFound";
import Login from "./pages/login";
import AdministratorDashboard from "./pages/administrator-dashboard";
import EmployeeManagement from "./pages/employee-management";
import VacationRequestManagement from "./pages/vacation-request-management";
import BlogManagement from "./pages/blog-management";
import EmployeeVacationPortal from "./pages/employee-vacation-portal";
import HolidayCalendarManagement from "./pages/holiday-calendar-management";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog/detail";
import ProcessAndPolitics from "./pages/process-and-politics";
import WorkPermits from "./pages/work-permits";
import WorkPermitsManagement from "./pages/work-permits-management";
import ProtectedPage from "pages/protected/ProtectedPage";
import ErrorBoundary from "components/ErrorBoundary";

const queryClient = new QueryClient();

const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
];

const protectedRoutes = [
  {
    path: "/administrator-dashboard",
    element: <AdministratorDashboard />,
  },
  {
    path: "/employee-management",
    element: <EmployeeManagement />,
  },
  {
    path: "/vacation-request-management",
    element: <VacationRequestManagement />,
  },
  {
    path: "/blog-management",
    element: <BlogManagement />,
  },
  {
    path: "/employee-vacation-portal",
    element: <EmployeeVacationPortal />,
  },
  {
    path: "/holiday-calendar-management",
    element: <HolidayCalendarManagement />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
  {
    path: "/process-and-politics",
    element: <ProcessAndPolitics />,
  },
  {
    path: "/work-permits",
    element: <WorkPermits />,
  },
  {
    path: "/work-permits-management",
    element: <WorkPermitsManagement />,
  },
];

const router = createBrowserRouter([
  ...protectedRoutes.map((route) => ({
    ...route,
    element: <ProtectedPage>{route.element}</ProtectedPage>,
  })),
  ...publicRoutes,
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <AuthProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ErrorBoundary>
    </AuthProvider>
  </>
);
