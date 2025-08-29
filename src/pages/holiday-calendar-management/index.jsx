import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import CalendarView from './components/CalendarView';
import HolidayList from './components/HolidayList';
import HolidayModal from './components/HolidayModal';
import YearNavigation from './components/YearNavigation';
import BulkImportModal from './components/BulkImportModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const HolidayCalendarManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date()?.getFullYear());
  const [holidays, setHolidays] = useState([]);
  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [bulkImportModalOpen, setBulkImportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalMode, setModalMode] = useState('create');

  // Mock user data
  const currentUser = {
    name: "María González",
    email: "maria.gonzalez@vacablog.com",
    role: "admin"
  };

  // Mock holidays data with Mexican national holidays
  const mockHolidays = [
    {
      id: 1,
      name: "Año Nuevo",
      date: `${selectedYear}-01-01`,
      type: "national",
      description: "Celebración del Año Nuevo"
    },
    {
      id: 2,
      name: "Día de la Constitución",
      date: `${selectedYear}-02-05`,
      type: "national",
      description: "Conmemoración de la Constitución Mexicana"
    },
    {
      id: 3,
      name: "Natalicio de Benito Juárez",
      date: `${selectedYear}-03-18`,
      type: "national",
      description: "Día de Benito Juárez"
    },
    {
      id: 4,
      name: "Día del Trabajo",
      date: `${selectedYear}-05-01`,
      type: "national",
      description: "Día Internacional del Trabajo"
    },
    {
      id: 5,
      name: "Día de la Independencia",
      date: `${selectedYear}-09-16`,
      type: "national",
      description: "Grito de Independencia de México"
    },
    {
      id: 6,
      name: "Día de la Revolución",
      date: `${selectedYear}-11-20`,
      type: "national",
      description: "Revolución Mexicana"
    },
    {
      id: 7,
      name: "Navidad",
      date: `${selectedYear}-12-25`,
      type: "national",
      description: "Celebración de Navidad"
    },
    {
      id: 8,
      name: "Día de la Empresa",
      date: `${selectedYear}-06-15`,
      type: "company",
      description: "Aniversario de la fundación de la empresa"
    },
    {
      id: 9,
      name: "Día del Empleado",
      date: `${selectedYear}-08-20`,
      type: "company",
      description: "Reconocimiento a todos los empleados"
    },
    {
      id: 10,
      name: "Cierre de Fin de Año",
      date: `${selectedYear}-12-31`,
      type: "company",
      description: "Cierre administrativo de fin de año"
    }
  ];

  useEffect(() => {
    // Update holidays when year changes
    const updatedHolidays = mockHolidays?.map(holiday => ({
      ...holiday,
      date: holiday?.date?.replace(/^\d{4}/, selectedYear?.toString())
    }));
    setHolidays(updatedHolidays);
  }, [selectedYear]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleDateClick = (date, month, year) => {
    const existingHoliday = holidays?.find(h => {
      const holidayDate = new Date(h.date);
      return holidayDate?.getDate() === date && 
             holidayDate?.getMonth() === month && 
             holidayDate?.getFullYear() === year;
    });

    if (existingHoliday) {
      setSelectedHoliday(existingHoliday);
      setModalMode('edit');
    } else {
      setSelectedDate({ date, month, year });
      setSelectedHoliday(null);
      setModalMode('create');
    }
    setHolidayModalOpen(true);
  };

  const handleHolidayClick = (holiday) => {
    setSelectedHoliday(holiday);
    setModalMode('edit');
    setHolidayModalOpen(true);
  };

  const handleAddHoliday = () => {
    setSelectedHoliday(null);
    setSelectedDate(null);
    setModalMode('create');
    setHolidayModalOpen(true);
  };

  const handleEditHoliday = (holiday) => {
    setSelectedHoliday(holiday);
    setModalMode('edit');
    setHolidayModalOpen(true);
  };

  const handleDeleteHoliday = (holiday) => {
    setSelectedHoliday(holiday);
    setDeleteModalOpen(true);
  };

  const handleSaveHoliday = async (holidayData) => {
    if (modalMode === 'edit') {
      setHolidays(prev => prev?.map(h => 
        h?.id === holidayData?.id ? holidayData : h
      ));
    } else {
      setHolidays(prev => [...prev, holidayData]);
    }
    setHolidayModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedHoliday) {
      setHolidays(prev => prev?.filter(h => h?.id !== selectedHoliday?.id));
      setDeleteModalOpen(false);
      setSelectedHoliday(null);
    }
  };

  const handleBulkImport = async (importedHolidays) => {
    const newHolidays = importedHolidays?.map(holiday => ({
      ...holiday,
      id: Date.now() + Math.random()
    }));
    setHolidays(prev => [...prev, ...newHolidays]);
    setBulkImportModalOpen(false);
  };

  const handleExport = () => {
    const csvContent = [
      'Nombre,Fecha,Tipo,Descripción',
      ...holidays?.map(h => `"${h?.name}","${h?.date}","${h?.type}","${h?.description || ''}"`)
    ]?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dias_festivos_${selectedYear}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

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
      <main className={`pt-16 transition-layout ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <BreadcrumbTrail />
          
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Gestión de Días Festivos
                </h1>
                <p className="text-muted-foreground">
                  Administra los días festivos de la empresa para cálculos precisos de vacaciones
                </p>
              </div>
            </div>

            <QuickActionPanel 
              userRole={currentUser?.role}
              className="mb-6"
            />
          </div>

          <YearNavigation
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            onAddHoliday={handleAddHoliday}
            onBulkImport={() => setBulkImportModalOpen(true)}
            onExport={handleExport}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Holiday List Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <HolidayList
                holidays={holidays}
                selectedYear={selectedYear}
                onEditHoliday={handleEditHoliday}
                onDeleteHoliday={handleDeleteHoliday}
              />
            </div>

            {/* Calendar View */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <CalendarView
                selectedYear={selectedYear}
                holidays={holidays}
                onDateClick={handleDateClick}
                onHolidayClick={handleHolidayClick}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <HolidayModal
        isOpen={holidayModalOpen}
        onClose={() => setHolidayModalOpen(false)}
        onSave={handleSaveHoliday}
        holiday={selectedHoliday}
        selectedDate={selectedDate}
        mode={modalMode}
      />
      <BulkImportModal
        isOpen={bulkImportModalOpen}
        onClose={() => setBulkImportModalOpen(false)}
        onImport={handleBulkImport}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        holiday={selectedHoliday}
      />
    </div>
  );
};

export default HolidayCalendarManagement;