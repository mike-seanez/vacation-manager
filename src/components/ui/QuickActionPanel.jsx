import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const QuickActionPanel = ({ userRole = 'admin', className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQuickActions = () => {
    const currentPath = location?.pathname;
    
    // Dashboard quick actions
    if (currentPath === '/administrator-dashboard') {
      if (userRole === 'admin' || userRole === 'hr') {
        return [
          {
            label: 'Añadir empleado',
            icon: 'UserPlus',
            action: () => navigate('/employee-management?action=add'),
            variant: 'default'
          },
          {
            label: 'Solicitudes de vacaciones',
            icon: 'Calendar',
            action: () => navigate('/vacation-request-management'),
            variant: 'outline'
          },
          {
            label: 'Crear página de blog',
            icon: 'FileText',
            action: () => navigate('/blog-management?action=create'),
            variant: 'outline'
          },
          {
            label: 'Añadir día festivo',
            icon: 'CalendarDays',
            action: () => navigate('/holiday-calendar-management?action=add'),
            variant: 'outline'
          }
        ];
      } else {
        return [
          {
            label: 'Solicitar vacaciones',
            icon: 'Plane',
            action: () => navigate('/employee-vacation-portal?action=request'),
            variant: 'default'
          },
        ];
      }
    }

    // Employee Management quick actions
    if (currentPath === '/employee-management') {
      return [
        {
          label: 'Añadir empleado',
          icon: 'UserPlus',
          action: () => console.log('Add employee'),
          variant: 'default'
        },
      ];
    }
  
    return [];
  };

  const quickActions = getQuickActions();

  if (quickActions?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-card rounded-lg border border-border p-4 shadow-elevation-1 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Acciones rápidas</h3>
        <Icon name="Zap" size={16} className="text-accent" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            size="sm"
            onClick={action?.action}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={16}
            className="justify-start"
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;