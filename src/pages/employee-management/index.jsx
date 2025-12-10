import React, { useState, useEffect } from "react";
import NavigationHeader from "../../components/ui/NavigationHeader";
import RoleBasedSidebar from "../../components/ui/RoleBasedSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import QuickActionPanel from "../../components/ui/QuickActionPanel";
import Button from "../../components/ui/Button";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeFilters from "./components/EmployeeFilters";
import AddEmployeeModal from "./components/AddEmployeeModal";
import BulkActionsPanel from "./components/BulkActionsPanel";
import EmployeeStatsCards from "./components/EmployeeStatsCards";
import { useUser } from "domain/UseCases/userCases/useUser";
import { useGetUser } from "../../hooks/useGetUser";
import { useDepartment } from "domain/UseCases/departmentCases/useDepartment";

const EmployeeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { getDepartments } = useDepartment();
  const currentUser = useGetUser();
  const { createUser } = useUser();
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    joinDateFrom: "",
    joinDateTo: "",
    minVacationBalance: "",
    maxVacationBalance: "",
  });
  const { getUsers } = useUser();

  useEffect(() => {
    getUsers().then((res) => {
      setEmployees(res || []);
      setFilteredEmployees(res || []);
    });
    getDepartments().then((res) => {
      setDepartments(res || []);
    });
  }, []);

  useEffect(() => {
    let filtered = employees;

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(
        (emp) =>
          emp?.full_name?.toLowerCase()?.includes(searchTerm) ||
          emp?.email?.toLowerCase()?.includes(searchTerm) ||
          emp?.position?.toLowerCase()?.includes(searchTerm) ||
          emp?.employeeId?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply department filter
    if (filters?.department) {
      filtered = filtered?.filter(
        (emp) => emp?.department === filters?.department
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter((emp) => emp?.status === filters?.status);
    }

    // Apply date range filters
    if (filters?.joinDateFrom) {
      filtered = filtered?.filter(
        (emp) => new Date(emp.join_date) >= new Date(filters.joinDateFrom)
      );
    }
    if (filters?.joinDateTo) {
      filtered = filtered?.filter(
        (emp) => new Date(emp.join_date) <= new Date(filters.joinDateTo)
      );
    }

    // Apply vacation balance filters
    if (filters?.minVacationBalance) {
      filtered = filtered?.filter(
        (emp) => emp?.vacationBalance >= parseInt(filters?.minVacationBalance)
      );
    }
    if (filters?.maxVacationBalance) {
      filtered = filtered?.filter(
        (emp) => emp?.vacationBalance <= parseInt(filters?.maxVacationBalance)
      );
    }

    setFilteredEmployees(filtered);
  }, [filters, employees]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleAddEmployee = async (employeeData) => {
    console.log("Debe de llegar aqui ", employeeData);
    const newEmployee = {
      ...employeeData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${employeeData?.full_name}`,
    };
    await createUser(newEmployee);
    setEmployees((prev) => [...prev, newEmployee]);
    setShowAddModal(false);
  };

  const handleEditEmployee = (employee) => {
    console.log("Edit employee:", employee);
    // Implementation for edit functionality
  };

  const handleViewEmployee = (employee) => {
    console.log("View employee:", employee);
    // Implementation for view functionality
  };

  const handleDeactivateEmployee = (employee) => {
    console.log("Deactivate employee:", employee);
    // Implementation for deactivation
  };

  const handleSelectEmployee = (employeeId, isSelected) => {
    if (isSelected) {
      setSelectedEmployees((prev) => [...prev, employeeId]);
    } else {
      setSelectedEmployees((prev) => prev?.filter((id) => id !== employeeId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedEmployees(filteredEmployees?.map((emp) => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleBulkAction = async (action, employeeIds) => {
    console.log("Bulk action:", action, "for employees:", employeeIds);

    switch (action) {
      case "activate":
        setEmployees((prev) =>
          prev?.map((emp) =>
            employeeIds?.includes(emp?.id) ? { ...emp, status: "active" } : emp
          )
        );
        break;
      case "deactivate":
        setEmployees((prev) =>
          prev?.map((emp) =>
            employeeIds?.includes(emp?.id)
              ? { ...emp, status: "inactive" }
              : emp
          )
        );
        break;
      case "suspend":
        setEmployees((prev) =>
          prev?.map((emp) =>
            employeeIds?.includes(emp?.id)
              ? { ...emp, status: "suspended" }
              : emp
          )
        );
        break;
      case "export":
        // Export functionality
        console.log("Exporting employee data...");
        break;
      default:
        console.log("Unknown action:", action);
    }

    setSelectedEmployees([]);
  };

  const handleClearSelection = () => {
    setSelectedEmployees([]);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      department: "",
      status: "",
      joinDateFrom: "",
      joinDateTo: "",
      minVacationBalance: "",
      maxVacationBalance: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader onMenuToggle={handleToggleSidebar} user={currentUser} />
      <RoleBasedSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={handleCloseSidebar}
        userRole={currentUser?.role_id}
      />
      <main
        className={`pt-16 transition-layout ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"
        }`}
      >
        <div className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbTrail />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Gestión de Empleados
                </h1>
                <p className="text-muted-foreground mt-1">
                  Administra los perfiles de empleados y sus datos de vacaciones
                </p>
              </div>

              <Button
                onClick={() => setShowAddModal(true)}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={16}
              >
                Agregar Empleado
              </Button>
            </div>

            <EmployeeStatsCards employees={employees} />

            <QuickActionPanel userRole="admin" className="mb-6" />

            <EmployeeFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              departments={departments}
              totalEmployees={employees?.length}
              filteredCount={filteredEmployees?.length}
            />

            <BulkActionsPanel
              selectedEmployees={selectedEmployees}
              onBulkAction={handleBulkAction}
              onClearSelection={handleClearSelection}
            />

            <EmployeeTable
              employees={filteredEmployees}
              departments={departments}
              onEdit={handleEditEmployee}
              onView={handleViewEmployee}
              onDeactivate={handleDeactivateEmployee}
              selectedEmployees={selectedEmployees}
              onSelectEmployee={handleSelectEmployee}
              onSelectAll={handleSelectAll}
            />

            <AddEmployeeModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSave={handleAddEmployee}
              departments={departments}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeManagement;
