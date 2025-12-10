import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ 
  selectedYear, 
  holidays, 
  onDateClick, 
  onHolidayClick,
  currentDate = new Date() 
}) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate?.getMonth());

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1)?.getDay();
  };

  const isHoliday = (date) => {
    const dateStr = `${selectedYear}-${String(currentMonth + 1)?.padStart(2, '0')}-${String(date)?.padStart(2, '0')}`;
    return holidays?.find(holiday => holiday?.date === dateStr);
  };

  const isWeekend = (date) => {
    const dayOfWeek = new Date(selectedYear, currentMonth, date)?.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isToday = (date) => {
    const today = new Date();
    return today?.getFullYear() === selectedYear && 
           today?.getMonth() === currentMonth && 
           today?.getDate() === date;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(currentMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(
        <div key={`empty-${i}`} className="h-24 border border-border bg-muted/30"></div>
      );
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const holiday = isHoliday(date);
      const weekend = isWeekend(date);
      const today = isToday(date);

      days?.push(
        <div
          key={date}
          className={`h-24 border border-border cursor-pointer transition-smooth hover:bg-muted/50 ${
            holiday 
              ? holiday ?'bg-red-50 border-red-200' :'bg-blue-50 border-blue-200'
              : weekend 
                ? 'bg-gray-50' :'bg-card hover:bg-muted/30'
          } ${today ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onDateClick(date, currentMonth, selectedYear)}
        >
          <div className="p-2 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                holiday ? 'text-foreground' : 
                weekend ? 'text-muted-foreground': 'text-foreground'
              }`}>
                {date}
              </span>
              {holiday && (
                <Icon 
                  name='Lock'
                  size={12} 
                  className='text-red-600'
                />
              )}
            </div>
            {holiday && (
              <div 
                className="mt-1 flex-1 cursor-pointer"
                onClick={(e) => {
                  e?.stopPropagation();
                  onHolidayClick(holiday);
                }}
              >
                <div className={`text-xs p-1 rounded truncate bg-red-100 text-red-800`}>
                  {holiday?.description}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    } else {
      setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            iconName="ChevronLeft"
            iconSize={16}
          >
            <span className="sr-only">Mes anterior</span>
          </Button>
          
          <h3 className="text-lg font-semibold text-foreground min-w-[200px] text-center">
            {months?.[currentMonth]} {selectedYear}
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            iconName="ChevronRight"
            iconSize={16}
          >
            <span className="sr-only">Mes siguiente</span>
          </Button>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {weekDays?.map((day) => (
            <div key={day} className="h-8 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>
      </div>
      {/* Mobile View Toggle */}
      <div className="lg:hidden p-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          iconName="List"
          iconPosition="left"
          iconSize={16}
        >
          Ver como lista
        </Button>
      </div>
    </div>
  );
};

export default CalendarView;