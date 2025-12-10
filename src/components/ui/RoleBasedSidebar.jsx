import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { Roles, toCanonicalRole, roleLabelEs } from '../../constants/roles';

const RoleBasedSidebar = ({ 
  isCollapsedProp = false, 
  isOpen = false, 
  onClose, 
  userRole = null 
}) => {
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(isCollapsedProp);

  const effectiveRole = toCanonicalRole(userRole) || Roles.EMPLOYEE;

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/administrator-dashboard',
      icon: 'LayoutDashboard',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES],
      tooltip: 'Overview and quick actions'
    },
    {
      label: 'Manejo de empleados',
      path: '/employee-management',
      icon: 'Users',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES],
      tooltip: 'Manage employee profiles and data'
    },
    {
      label: 'Solicitudes de vacaciones',
      path: '/vacation-request-management',
      icon: 'Calendar',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES, Roles.EMPLOYEE],
      tooltip: 'Review and approve vacation requests'
    },
    {
      label: 'Mis vacaciones',
      path: '/employee-vacation-portal',
      icon: 'Plane',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES, Roles.EMPLOYEE],
      tooltip: 'Submit and track vacation requests'
    },
    {
      label: 'Manejo de Blog',
      path: '/blog-management',
      icon: 'FileText',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES],
      tooltip: 'Create and manage company blog posts'
    },
    {
      label: 'Calendario de festivos',
      path: '/holiday-calendar-management',
      icon: 'CalendarDays',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES],
      tooltip: 'Manage company holidays and events'
    },
    {
      label: 'Blog',
      path: '/blog',
      icon: 'FileText',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES, Roles.EMPLOYEE],
      tooltip: 'See the company blog'
    },
    {
      label: 'Permisos',
      path: '/work-permits',
      icon: 'ShieldCheck',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES, Roles.EMPLOYEE],
      tooltip: 'Manage user permissions'
    },
    {
      label: 'Manejo de permisos',
      path: '/work-permits-management',
      icon: 'ShieldCheck',
      requiredRole: [Roles.ADMINISTRATOR, Roles.HUMAN_RESOURCES],
      tooltip: 'Manage user permissions'
    },
  ];

  const filteredItems = navigationItems?.filter(item => 
    item?.requiredRole?.includes(effectiveRole)
  );

  const isActive = (path) => location?.pathname === path;

  const sidebarClasses = `
    fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-200 transition-layout
    ${isCollapsed ? 'w-16' : 'w-72'}
    lg:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    shadow-elevation-1
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-200 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <div className="flex justify-end p-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            >
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {filteredItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={onClose}
                className={`
                  group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-smooth
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
                title={isCollapsed ? item?.tooltip : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${!isCollapsed ? 'mr-3' : ''}`}
                />
                {!isCollapsed && (
                  <span className="truncate">{item?.label}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap z-400">
                    {item?.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* User Role Indicator */}
          {!isCollapsed && (
            <div className="px-4 py-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {roleLabelEs[effectiveRole] || effectiveRole}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {effectiveRole === Roles.ADMINISTRATOR ? 'Acceso completo' : 
                     effectiveRole === Roles.HUMAN_RESOURCES ? 'Acceso de gestión HR' : 
                     effectiveRole === Roles.EMPLOYEE ? 'Acceso de servicio al empleado' : ''}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Collapse Toggle (Desktop Only) */}
          <div className="hidden lg:block px-4 py-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {setIsCollapsed(!isCollapsed)}}
              className="w-full justify-center"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={16}
            >
              {!isCollapsed && "Cerrar"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default RoleBasedSidebar;
