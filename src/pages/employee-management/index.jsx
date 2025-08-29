import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import Button from '../../components/ui/Button';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFilters from './components/EmployeeFilters';
import AddEmployeeModal from './components/AddEmployeeModal';
import BulkActionsPanel from './components/BulkActionsPanel';
import EmployeeStatsCards from './components/EmployeeStatsCards';

const EmployeeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    status: '',
    joinDateFrom: '',
    joinDateTo: '',
    minVacationBalance: '',
    maxVacationBalance: ''
  });

  // Mock employee data
  const mockEmployees = [
    {
      id: 1,
      fullName: "María Elena González Rodríguez",
      email: "maria.gonzalez@vacablog.com",
      position: "Gerente de Recursos Humanos",
      department: "Recursos Humanos",
      joinDate: "2020-03-15",
      birthDate: "1985-07-22",
      vacationBalance: 18,
      nextAccrualDate: "2025-03-15",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      username: "mgonzalez",
      phone: "+52 55 1234 5678",
      employeeId: "EMP001"
    },
    {
      id: 2,
      fullName: "Carlos Alberto Mendoza Silva",
      email: "carlos.mendoza@vacablog.com",
      position: "Desarrollador Senior",
      department: "Tecnología",
      joinDate: "2019-08-10",
      birthDate: "1988-12-03",
      vacationBalance: 22,
      nextAccrualDate: "2025-08-10",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      username: "cmendoza",
      phone: "+52 55 2345 6789",
      employeeId: "EMP002"
    },
    {
      id: 3,
      fullName: "Ana Patricia Herrera López",
      email: "ana.herrera@vacablog.com",
      position: "Diseñadora UX/UI",
      department: "Diseño",
      joinDate: "2021-01-20",
      birthDate: "1992-04-15",
      vacationBalance: 14,
      nextAccrualDate: "2025-01-20",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      username: "aherrera",
      phone: "+52 55 3456 7890",
      employeeId: "EMP003"
    },
    {
      id: 4,
      fullName: "Roberto Javier Castillo Morales",
      email: "roberto.castillo@vacablog.com",
      position: "Contador Senior",
      department: "Finanzas",
      joinDate: "2018-05-12",
      birthDate: "1980-09-28",
      vacationBalance: 24,
      nextAccrualDate: "2025-05-12",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      username: "rcastillo",
      phone: "+52 55 4567 8901",
      employeeId: "EMP004"
    },
    {
      id: 5,
      fullName: "Sofía Alejandra Ramírez Torres",
      email: "sofia.ramirez@vacablog.com",
      position: "Especialista en Marketing",
      department: "Marketing",
      joinDate: "2022-09-05",
      birthDate: "1995-11-12",
      vacationBalance: 12,
      nextAccrualDate: "2025-09-05",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      username: "sramirez",
      phone: "+52 55 5678 9012",
      employeeId: "EMP005"
    },
    {
      id: 6,
      fullName: "Diego Fernando Vázquez Ruiz",
      email: "diego.vazquez@vacablog.com",
      position: "Analista de Datos",
      department: "Tecnología",
      joinDate: "2023-02-14",
      birthDate: "1990-06-08",
      vacationBalance: 8,
      nextAccrualDate: "2025-02-14",
      status: "suspended",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      username: "dvazquez",
      phone: "+52 55 6789 0123",
      employeeId: "EMP006"
    },
    {
      id: 7,
      fullName: "Lucía Fernanda Jiménez Cruz",
      email: "lucia.jimenez@vacablog.com",
      position: "Coordinadora de Ventas",
      department: "Ventas",
      joinDate: "2020-11-30",
      birthDate: "1987-03-25",
      vacationBalance: 16,
      nextAccrualDate: "2025-11-30",
      status: "inactive",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      username: "ljimenez",
      phone: "+52 55 7890 1234",
      employeeId: "EMP007"
    },
    {
      id: 8,
      fullName: "Miguel Ángel Sánchez Pérez",
      email: "miguel.sanchez@vacablog.com",
      position: "Jefe de Operaciones",
      department: "Operaciones",
      joinDate: "2017-04-18",
      birthDate: "1983-01-14",
      vacationBalance: 26,
      nextAccrualDate: "2025-04-18",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      username: "msanchez",
      phone: "+52 55 8901 2345",
      employeeId: "EMP008"
    }
  ];

  const departments = [...new Set(mockEmployees.map(emp => emp.department))];

  useEffect(() => {
    setEmployees(mockEmployees);
    setFilteredEmployees(mockEmployees);
  }, []);

  useEffect(() => {
    let filtered = employees;

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(emp => 
        emp?.fullName?.toLowerCase()?.includes(searchTerm) ||
        emp?.email?.toLowerCase()?.includes(searchTerm) ||
        emp?.position?.toLowerCase()?.includes(searchTerm) ||
        emp?.employeeId?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply department filter
    if (filters?.department) {
      filtered = filtered?.filter(emp => emp?.department === filters?.department);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(emp => emp?.status === filters?.status);
    }

    // Apply date range filters
    if (filters?.joinDateFrom) {
      filtered = filtered?.filter(emp => new Date(emp.joinDate) >= new Date(filters.joinDateFrom));
    }
    if (filters?.joinDateTo) {
      filtered = filtered?.filter(emp => new Date(emp.joinDate) <= new Date(filters.joinDateTo));
    }

    // Apply vacation balance filters
    if (filters?.minVacationBalance) {
      filtered = filtered?.filter(emp => emp?.vacationBalance >= parseInt(filters?.minVacationBalance));
    }
    if (filters?.maxVacationBalance) {
      filtered = filtered?.filter(emp => emp?.vacationBalance <= parseInt(filters?.maxVacationBalance));
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
    const newEmployee = {
      ...employeeData,
      id: Date.now(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${employeeData?.fullName}`
    };
    setEmployees(prev => [...prev, newEmployee]);
    setShowAddModal(false);
  };

  const handleEditEmployee = (employee) => {
    console.log('Edit employee:', employee);
    // Implementation for edit functionality
  };

  const handleViewEmployee = (employee) => {
    console.log('View employee:', employee);
    // Implementation for view functionality
  };

  const handlePasswordReset = (employee) => {
    console.log('Reset password for:', employee);
    // Implementation for password reset
  };

  const handleDeactivateEmployee = (employee) => {
    console.log('Deactivate employee:', employee);
    // Implementation for deactivation
  };

  const handleSelectEmployee = (employeeId, isSelected) => {
    if (isSelected) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev?.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedEmployees(filteredEmployees?.map(emp => emp?.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleBulkAction = async (action, employeeIds) => {
    console.log('Bulk action:', action, 'for employees:', employeeIds);
    
    switch (action) {
      case 'activate':
        setEmployees(prev => prev?.map(emp => 
          employeeIds?.includes(emp?.id) ? { ...emp, status: 'active' } : emp
        ));
        break;
      case 'deactivate':
        setEmployees(prev => prev?.map(emp => 
          employeeIds?.includes(emp?.id) ? { ...emp, status: 'inactive' } : emp
        ));
        break;
      case 'suspend':
        setEmployees(prev => prev?.map(emp => 
          employeeIds?.includes(emp?.id) ? { ...emp, status: 'suspended' } : emp
        ));
        break;
      case 'export':
        // Export functionality
        console.log('Exporting employee data...');
        break;
      default:
        console.log('Unknown action:', action);
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
      search: '',
      department: '',
      status: '',
      joinDateFrom: '',
      joinDateTo: '',
      minVacationBalance: '',
      maxVacationBalance: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader onMenuToggle={handleToggleSidebar} />
      <RoleBasedSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={handleCloseSidebar}
        userRole="admin"
      />
      <main className={`pt-16 transition-layout ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'}`}>
        <div className="p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbTrail />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestión de Empleados</h1>
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
              onEdit={handleEditEmployee}
              onView={handleViewEmployee}
              onPasswordReset={handlePasswordReset}
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