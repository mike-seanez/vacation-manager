import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const { totalRequests, approvedRequests, pendingRequests, deniedRequests } = stats;

  const statItems = [
    {
      label: 'Total Solicitudes',
      value: totalRequests,
      icon: 'FileText',
      color: 'text-foreground',
      bgColor: 'bg-muted'
    },
    {
      label: 'Aprobadas',
      value: approvedRequests,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Pendientes',
      value: pendingRequests,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Denegadas',
      value: deniedRequests,
      icon: 'XCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Estadísticas Rápidas</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        {statItems?.map((item, index) => (
          <div key={index} className={`${item?.bgColor} rounded-lg p-4`}>
            <div className="flex items-center space-x-2 mb-1">
              <Icon name={item?.icon} size={16} className={item?.color} />
              <span className="text-xs font-medium text-muted-foreground">{item?.label}</span>
            </div>
            <p className={`text-center text-xl font-bold ${item?.color}`}>{item?.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;