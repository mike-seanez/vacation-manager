import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VacationRequestForm = ({ availableDays, onSubmit, companyHolidays = [] }) => {
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    reason: '',
    total_days: 0,
  });
  const [calculatedDays, setCalculatedDays] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateWorkingDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workingDays = 0;
    
    for (let date = new Date(start); date <= end; date?.setDate(date?.getDate() + 1)) {
      const dayOfWeek = date?.getDay();
      const dateString = date?.toISOString()?.split('T')?.[0];
      
      // Skip Sundays (0) and company holidays
      if (dayOfWeek !== 0 && !companyHolidays?.includes(dateString)) {
        workingDays++;
      }
    }
    
    return workingDays;
  };

  useEffect(() => {
    if (formData?.start_date && formData?.end_date) {
      const days = calculateWorkingDays(formData?.start_date, formData?.end_date);
      setCalculatedDays(days);
    } else {
      setCalculatedDays(0);
    }
  }, [formData?.start_date, formData?.end_date]);

  const validateForm = () => {
    const newErrors = {};
    const today = new Date()?.toISOString()?.split('T')?.[0];

    if (!formData?.start_date) {
      newErrors.startDate = 'La fecha de inicio es requerida';
    } else if (formData?.start_date < today) {
      newErrors.startDate = 'No puedes seleccionar fechas pasadas';
    }

    if (!formData?.end_date) {
      newErrors.endDate = 'La fecha de fin es requerida';
    } else if (formData?.end_date < formData?.start_date) {
      newErrors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
    }

    if (calculatedDays > availableDays) {
      newErrors.days = `No tienes suficientes días disponibles. Solicitaste ${calculatedDays} días, pero solo tienes ${availableDays} disponibles.`;
    }

    if (!formData?.reason?.trim()) {
      newErrors.reason = 'El motivo es requerido';
    } else if (formData?.reason?.length < 10) {
      newErrors.reason = 'El motivo debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        total_days: calculatedDays,
      });
      
      // Reset form
      setFormData({ start_date: '', end_date: '', reason: '' });
      setCalculatedDays(0);
    } catch (error) {
      console.error('Error submitting vacation request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getTodayDate = () => {
    return new Date()?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Plane" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Solicitar Vacaciones</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Fecha de Inicio"
            type="date"
            value={formData?.start_date}
            onChange={(e) => handleInputChange('start_date', e?.target?.value)}
            min={getTodayDate()}
            error={errors?.start_date}
            required
          />

          <Input
            label="Fecha de Fin"
            type="date"
            value={formData?.end_date}
            onChange={(e) => handleInputChange('end_date', e?.target?.value)}
            min={formData?.start_date || getTodayDate()}
            error={errors?.end_date}
            required
          />
        </div>

        {calculatedDays > 0 && (
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calculator" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Días laborales solicitados:</span>
              </div>
              <span className={`text-lg font-bold ${calculatedDays > availableDays ? 'text-destructive' : 'text-success'}`}>
                {calculatedDays} días
              </span>
            </div>
            {calculatedDays > availableDays && (
              <p className="text-sm text-destructive mt-2">
                Excedes tu balance disponible de {availableDays} días
              </p>
            )}
          </div>
        )}

        {errors?.days && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-sm text-destructive">{errors?.days}</p>
            </div>
          </div>
        )}

        <div>
          <Input
            label="Motivo de la Solicitud"
            type="text"
            placeholder="Describe el motivo de tu solicitud de vacaciones..."
            value={formData?.reason}
            onChange={(e) => handleInputChange('reason', e?.target?.value)}
            error={errors?.reason}
            description={`${formData?.reason?.length}/200 caracteres`}
            maxLength={200}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Info" size={16} />
            <span className="text-sm">Los domingos y días festivos no se cuentan</span>
          </div>
          
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            disabled={calculatedDays === 0 || calculatedDays > availableDays}
            iconName="Send"
            iconPosition="left"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VacationRequestForm;