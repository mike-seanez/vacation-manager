import React from 'react';
import Icon from '../../../components/AppIcon';

const VacationBalanceCard = ({ balanceData }) => {
  const { earnedDays, usedDays, pendingDays, availableDays, nextEarnDate } = balanceData;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Mi Balance de Vacaciones</h2>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Calendar" size={20} />
          <span className="text-sm font-medium">Actualizado hoy</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Plus" size={16} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Días Ganados</span>
          </div>
          <p className="text-center text-2xl font-bold text-success">{earnedDays}</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Minus" size={16} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Días Usados</span>
          </div>
          <p className="text-center text-2xl font-bold text-warning">{usedDays}</p> 
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Pendientes</span>
          </div>
          <p className="text-center text-2xl font-bold text-accent">{pendingDays}</p>
        </div>

        <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center mb-2">
            <Icon name="CheckCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Disponibles</span>
          </div>
          <p className="text-center text-3xl font-bold text-primary">{availableDays}</p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Próximos días a ganar:</span>
          </div>
          <span className="text-sm font-medium text-foreground">{nextEarnDate}</span>
        </div>
      </div>
    </div>
  );
};

export default VacationBalanceCard;