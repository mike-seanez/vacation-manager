import React from 'react';
import Icon from '../../../components/AppIcon';

const EmployeeStatsCards = ({ employees = [] }) => {
  const stats = {
    total: employees?.length,
    active: employees?.filter(emp => emp?.status === 'active')?.length,
    inactive: employees?.filter(emp => emp?.status === 'inactive')?.length,
    suspended: employees?.filter(emp => emp?.status === 'suspended')?.length,
    newThisMonth: employees?.filter(emp => {
      const joinDate = new Date(emp.joinDate);
      const now = new Date();
      return joinDate?.getMonth() === now?.getMonth() && joinDate?.getFullYear() === now?.getFullYear();
    })?.length,
    highVacationBalance: employees?.filter(emp => emp?.vacationBalance > 20)?.length
  };

  const cards = [
    {
      title: 'Total de Empleados',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2.5%',
      changeType: 'positive'
    },
    {
      title: 'Empleados Activos',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: `${((stats?.active / stats?.total) * 100)?.toFixed(1)}%`,
      changeType: 'neutral'
    },
    {
      title: 'Nuevos este Mes',
      value: stats?.newThisMonth,
      icon: 'UserPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+12.3%',
      changeType: 'positive'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card?.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{card?.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${card?.bgColor} flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
          </div>
          
          <div className="flex items-center mt-3">
            <Icon 
              name={card?.changeType === 'positive' ? 'TrendingUp' : card?.changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
              size={14} 
              className={
                card?.changeType === 'positive' ? 'text-success' : 
                card?.changeType === 'negative'? 'text-destructive' : 'text-muted-foreground'
              } 
            />
            <span className={`text-xs font-medium ml-1 ${
              card?.changeType === 'positive' ? 'text-success' : 
              card?.changeType === 'negative'? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {card?.change}
            </span>
            <span className="text-xs text-muted-foreground ml-1">vs mes anterior</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStatsCards;