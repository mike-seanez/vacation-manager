import React from 'react';
import Icon from '../../../components/AppIcon';

const EligibilityChecker = ({ employeeData }) => {
  if (!employeeData) {
    return (
      <div className="bg-muted/30 border border-border rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3 mb-2" />
        <div className="h-3 bg-muted rounded w-1/2 mb-1" />
        <div className="h-3 bg-muted rounded w-2/5" />
      </div>
    );
  }

  const { joinDate, monthsEmployed, isEligible, nextEligibilityDate } = employeeData;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMonthsUntilEligible = () => {
    if (typeof monthsEmployed !== 'number') return 0;
    return Math.max(0, 12 - monthsEmployed);
  };

  if (isEligible) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <div>
            <h3 className="text-sm font-semibold text-success">Elegible para Vacaciones</h3>
            <p className="text-sm text-success/80">
              Tienes más de 12 meses de antigüedad. Puedes solicitar vacaciones.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-warning mb-2">No Elegible para Vacaciones</h3>
          <div className="space-y-2 text-sm text-warning/80">
            <p>
              <strong>Fecha de ingreso:</strong> {formatDate(joinDate)}
            </p>
            <p>
              <strong>Meses trabajados:</strong> {monthsEmployed} de 12 meses requeridos
            </p>
            <p>
              <strong>Tiempo restante:</strong> {getMonthsUntilEligible()} meses
            </p>
            {nextEligibilityDate && (
              <p>
                <strong>Elegible a partir de:</strong> {formatDate(nextEligibilityDate)}
              </p>
            )}
          </div>
          <div className="mt-3 p-3 bg-warning/5 rounded border border-warning/10">
            <p className="text-xs text-warning/70">
              <strong>Ley Federal del Trabajo:</strong> Los trabajadores tienen derecho a vacaciones después de cumplir un año de servicio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;
