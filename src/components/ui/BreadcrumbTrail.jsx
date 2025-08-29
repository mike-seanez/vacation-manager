import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  const routeLabels = {
    '/administrator-dashboard': 'Dashboard',
    '/employee-management': 'Gestión de empleados',
    '/vacation-request-management': 'Gestión de solicitudes de vacaciones',
    '/blog-management': 'Gestión de blog',
    '/holiday-calendar-management': 'Calendario de festivos',
    '/employee-vacation-portal': 'Portal de vacaciones'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', path: '/administrator-dashboard', isActive: false }
    ];

    if (pathSegments?.length > 0) {
      const currentPath = `/${pathSegments?.join('/')}`;
      const currentLabel = routeLabels?.[currentPath] || pathSegments?.[pathSegments?.length - 1];
      
      if (currentPath !== '/administrator-dashboard') {
        breadcrumbs?.push({
          label: currentLabel,
          path: currentPath,
          isActive: true
        });
      } else {
        breadcrumbs[0].isActive = true;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1 && breadcrumbs?.[0]?.isActive) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground" 
              />
            )}
            
            {crumb?.isActive ? (
              <span className="font-medium text-foreground">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="hover:text-foreground transition-smooth"
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;