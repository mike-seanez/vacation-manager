import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HolidayModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  holiday = null, 
  selectedDate = null,
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'company',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const typeOptions = [
    { value: 'company', label: 'Día festivo de empresa' },
    { value: 'national', label: 'Día festivo nacional' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && holiday) {
        setFormData({
          name: holiday?.name || '',
          date: holiday?.date || '',
          type: holiday?.type || 'company',
          description: holiday?.description || ''
        });
      } else if (mode === 'create' && selectedDate) {
        const { date, month, year } = selectedDate;
        const dateStr = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(date)?.padStart(2, '0')}`;
        setFormData({
          name: '',
          date: dateStr,
          type: 'company',
          description: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, holiday, selectedDate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre del día festivo es obligatorio';
    }

    if (!formData?.date) {
      newErrors.date = 'La fecha es obligatoria';
    }

    if (!formData?.type) {
      newErrors.type = 'El tipo de día festivo es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const holidayData = {
        ...formData,
        id: mode === 'edit' ? holiday?.id : Date.now(),
        name: formData?.name?.trim(),
        description: formData?.description?.trim()
      };

      await onSave(holidayData);
      onClose();
    } catch (error) {
      console.error('Error saving holiday:', error);
      setErrors({ submit: 'Error al guardar el día festivo. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date?.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {mode === 'edit' ? 'Editar Día Festivo' : 'Agregar Día Festivo'}
              </h2>
              {formData?.date && (
                <p className="text-sm text-muted-foreground capitalize">
                  {formatDateForDisplay(formData?.date)}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Nombre del día festivo"
            type="text"
            placeholder="Ej: Día de la Independencia"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
            disabled={loading}
          />

          <Input
            label="Fecha"
            type="date"
            value={formData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            error={errors?.date}
            required
            disabled={loading}
          />

          <Select
            label="Tipo de día festivo"
            options={typeOptions}
            value={formData?.type}
            onChange={(value) => handleInputChange('type', value)}
            error={errors?.type}
            required
            disabled={loading}
            description={
              formData?.type === 'national' ?'Los días festivos nacionales no pueden ser modificados por otros usuarios' :'Los días festivos de empresa pueden ser editados o eliminados'
            }
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descripción (opcional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="Descripción adicional del día festivo..."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              disabled={loading}
            />
          </div>

          {errors?.submit && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{errors?.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              {mode === 'edit' ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HolidayModal;