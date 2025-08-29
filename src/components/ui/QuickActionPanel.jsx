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
            label: 'Add Employee',
            icon: 'UserPlus',
            action: () => navigate('/employee-management?action=add'),
            variant: 'default'
          },
          {
            label: 'Review Requests',
            icon: 'Calendar',
            action: () => navigate('/vacation-request-management'),
            variant: 'outline'
          },
          {
            label: 'Create Blog Post',
            icon: 'FileText',
            action: () => navigate('/blog-management?action=create'),
            variant: 'outline'
          },
          {
            label: 'Add Holiday',
            icon: 'CalendarDays',
            action: () => navigate('/holiday-calendar-management?action=add'),
            variant: 'outline'
          }
        ];
      } else {
        return [
          {
            label: 'Request Vacation',
            icon: 'Plane',
            action: () => navigate('/employee-vacation-portal?action=request'),
            variant: 'default'
          },
          {
            label: 'View Balance',
            icon: 'Clock',
            action: () => navigate('/employee-vacation-portal?tab=balance'),
            variant: 'outline'
          }
        ];
      }
    }

    // Employee Management quick actions
    if (currentPath === '/employee-management') {
      return [
        {
          label: 'Add Employee',
          icon: 'UserPlus',
          action: () => console.log('Add employee'),
          variant: 'default'
        },
        {
          label: 'Import CSV',
          icon: 'Upload',
          action: () => console.log('Import employees'),
          variant: 'outline'
        },
        {
          label: 'Export Data',
          icon: 'Download',
          action: () => console.log('Export employees'),
          variant: 'outline'
        }
      ];
    }

    // Vacation Request Management quick actions
    if (currentPath === '/vacation-request-management') {
      return [
        {
          label: 'Approve All',
          icon: 'CheckCircle',
          action: () => console.log('Approve all pending'),
          variant: 'success'
        },
        {
          label: 'Export Report',
          icon: 'FileText',
          action: () => console.log('Export report'),
          variant: 'outline'
        },
        {
          label: 'Send Reminders',
          icon: 'Bell',
          action: () => console.log('Send reminders'),
          variant: 'outline'
        }
      ];
    }

    // Blog Management quick actions
    if (currentPath === '/blog-management') {
      return [
        {
          label: 'New Post',
          icon: 'Plus',
          action: () => console.log('Create new post'),
          variant: 'default'
        },
        {
          label: 'Schedule Post',
          icon: 'Clock',
          action: () => console.log('Schedule post'),
          variant: 'outline'
        },
        {
          label: 'View Analytics',
          icon: 'BarChart3',
          action: () => console.log('View analytics'),
          variant: 'outline'
        }
      ];
    }

    // Holiday Calendar quick actions
    if (currentPath === '/holiday-calendar-management') {
      return [
        {
          label: 'Add Holiday',
          icon: 'Plus',
          action: () => console.log('Add holiday'),
          variant: 'default'
        },
        {
          label: 'Import Calendar',
          icon: 'Upload',
          action: () => console.log('Import calendar'),
          variant: 'outline'
        },
        {
          label: 'Sync External',
          icon: 'RefreshCw',
          action: () => console.log('Sync external calendar'),
          variant: 'outline'
        }
      ];
    }

    // Employee Vacation Portal quick actions
    if (currentPath === '/employee-vacation-portal') {
      return [
        {
          label: 'New Request',
          icon: 'Plus',
          action: () => console.log('New vacation request'),
          variant: 'default'
        },
        {
          label: 'Check Balance',
          icon: 'Clock',
          action: () => console.log('Check balance'),
          variant: 'outline'
        },
        {
          label: 'View History',
          icon: 'History',
          action: () => console.log('View history'),
          variant: 'outline'
        }
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
        <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
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