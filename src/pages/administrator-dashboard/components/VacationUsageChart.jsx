import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const VacationUsageChart = () => {
  const monthlyData = [
    { month: 'Ene', solicitudes: 12, aprobadas: 10, denegadas: 2 },
    { month: 'Feb', solicitudes: 18, aprobadas: 15, denegadas: 3 },
    { month: 'Mar', solicitudes: 25, aprobadas: 22, denegadas: 3 },
    { month: 'Abr', solicitudes: 30, aprobadas: 28, denegadas: 2 },
    { month: 'May', solicitudes: 35, aprobadas: 32, denegadas: 3 },
    { month: 'Jun', solicitudes: 42, aprobadas: 38, denegadas: 4 }
  ];

  // const departmentData = [
  //   { name: 'Desarrollo', value: 35, color: '#1E40AF' },
  //   { name: 'Marketing', value: 25, color: '#10B981' },
  //   { name: 'Ventas', value: 20, color: '#F59E0B' },
  //   { name: 'RRHH', value: 12, color: '#EF4444' },
  //   { name: 'Finanzas', value: 8, color: '#8B5CF6' }
  // ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey === 'solicitudes' ? 'Solicitudes' : 
               entry?.dataKey === 'aprobadas' ? 'Aprobadas' : 'Denegadas'}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-popover-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">{data?.value}% del total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Análisis de Vacaciones</h3>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1">
        {/* Bar Chart - Monthly Trends */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2 text-primary" />
            Tendencia Mensual
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="aprobadas" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="denegadas" fill="var(--color-error)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Department Distribution */}
        {/* <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="PieChart" size={16} className="mr-2 text-primary" />
            Por Departamento
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {departmentData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {departmentData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground">{item?.value}%</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">162</p>
            <p className="text-sm text-muted-foreground">Aprobadas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-error">17</p>
            <p className="text-sm text-muted-foreground">Denegadas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">8</p>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationUsageChart;