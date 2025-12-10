import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const YearNavigation = ({ 
  selectedYear, 
  onYearChange, 
  onAddHoliday, 
}) => {
  const currentYear = new Date()?.getFullYear();
  
  const yearOptions = [];
  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    yearOptions?.push({
      value: year,
      label: year?.toString()
    });
  }

  const navigateYear = (direction) => {
    const newYear = direction === 'prev' ? selectedYear - 1 : selectedYear + 1;
    onYearChange(newYear);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Year Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateYear('prev')}
              iconName="ChevronLeft"
              iconSize={16}
            >
              <span className="sr-only">Año anterior</span>
            </Button>
            
            <div className="min-w-[120px]">
              <Select
                options={yearOptions}
                value={selectedYear}
                onChange={onYearChange}
                className="text-center"
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateYear('next')}
              iconName="ChevronRight"
              iconSize={16}
            >
              <span className="sr-only">Año siguiente</span>
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {selectedYear === currentYear ? 'Año actual' : 
             selectedYear < currentYear ? 'Año pasado' : 'Año futuro'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={onAddHoliday}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Agregar Día Festivo
          </Button>

        </div>
      </div>


    </div>
  );
};

export default YearNavigation;