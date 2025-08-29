import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState([]);

  const sampleData = `Nombre,Fecha,Tipo,Descripción
Año Nuevo,2024-01-01,national,Celebración del Año Nuevo
Día de la Constitución,2024-02-05,national,Conmemoración de la Constitución
Natalicio de Benito Juárez,2024-03-18,national,Día de Benito Juárez
Día del Trabajo,2024-05-01,national,Día Internacional del Trabajo
Día de la Independencia,2024-09-16,national,Grito de Independencia
Día de la Revolución,2024-11-20,national,Revolución Mexicana
Navidad,2024-12-25,national,Celebración de Navidad
Día de la Empresa,2024-06-15,company,Aniversario de la empresa`;

  const handleFileChange = (e) => {
    const selectedFile = e?.target?.files?.[0];
    if (selectedFile) {
      if (selectedFile?.type !== 'text/csv' && !selectedFile?.name?.endsWith('.csv')) {
        setError('Por favor selecciona un archivo CSV válido');
        return;
      }
      
      setFile(selectedFile);
      setError('');
      parseCSVPreview(selectedFile);
    }
  };

  const parseCSVPreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e?.target?.result;
      const lines = text?.split('\n')?.filter(line => line?.trim());
      
      if (lines?.length < 2) {
        setError('El archivo CSV debe contener al menos una fila de datos');
        return;
      }

      const headers = lines?.[0]?.split(',')?.map(h => h?.trim());
      const expectedHeaders = ['Nombre', 'Fecha', 'Tipo', 'Descripción'];
      
      if (!expectedHeaders?.every(header => headers?.includes(header))) {
        setError('El archivo CSV debe contener las columnas: Nombre, Fecha, Tipo, Descripción');
        return;
      }

      const previewData = lines?.slice(1, 6)?.map((line, index) => {
        const values = line?.split(',')?.map(v => v?.trim());
        return {
          id: index,
          name: values?.[0] || '',
          date: values?.[1] || '',
          type: values?.[2] || '',
          description: values?.[3] || ''
        };
      });

      setPreview(previewData);
    };
    reader?.readAsText(file);
  };

  const handleImport = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo CSV');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e?.target?.result;
        const lines = text?.split('\n')?.filter(line => line?.trim());
        
        const holidays = lines?.slice(1)?.map((line, index) => {
          const values = line?.split(',')?.map(v => v?.trim());
          return {
            id: Date.now() + index,
            name: values?.[0],
            date: values?.[1],
            type: values?.[2],
            description: values?.[3] || ''
          };
        });

        await onImport(holidays);
        onClose();
      };
      reader?.readAsText(file);
    } catch (error) {
      setError('Error al procesar el archivo. Verifica el formato.');
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dias_festivos_ejemplo.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Upload" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Importar Días Festivos
              </h2>
              <p className="text-sm text-muted-foreground">
                Carga múltiples días festivos desde un archivo CSV
              </p>
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Formato requerido
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              El archivo CSV debe contener las siguientes columnas:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Nombre:</strong> Nombre del día festivo</li>
              <li>• <strong>Fecha:</strong> Formato YYYY-MM-DD (ej: 2024-12-25)</li>
              <li>• <strong>Tipo:</strong> "national" o "company"</li>
              <li>• <strong>Descripción:</strong> Descripción opcional</li>
            </ul>
            
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSample}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
              className="mt-3"
            >
              Descargar ejemplo
            </Button>
          </div>

          {/* File Upload */}
          <div>
            <Input
              label="Seleccionar archivo CSV"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              error={error}
              disabled={loading}
            />
          </div>

          {/* Preview */}
          {preview?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Vista previa (primeras 5 filas)
              </h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-foreground">Nombre</th>
                        <th className="px-3 py-2 text-left font-medium text-foreground">Fecha</th>
                        <th className="px-3 py-2 text-left font-medium text-foreground">Tipo</th>
                        <th className="px-3 py-2 text-left font-medium text-foreground">Descripción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview?.map((row) => (
                        <tr key={row?.id} className="border-t border-border">
                          <td className="px-3 py-2 text-foreground">{row?.name}</td>
                          <td className="px-3 py-2 text-foreground">{row?.date}</td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              row?.type === 'national' ?'bg-red-100 text-red-800' :'bg-blue-100 text-blue-800'
                            }`}>
                              {row?.type === 'national' ? 'Nacional' : 'Empresa'}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-muted-foreground truncate max-w-[200px]">
                            {row?.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleImport}
              loading={loading}
              disabled={!file}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              Importar Días Festivos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;