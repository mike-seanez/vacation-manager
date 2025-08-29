import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogEditor = ({ 
  post = null, 
  onSave, 
  onCancel, 
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    status: post?.status || 'draft',
    category: post?.category || '',
    publishDate: post?.publishDate || new Date()?.toISOString()?.split('T')?.[0],
    featuredImage: post?.featuredImage || '',
    attachments: post?.attachments || []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const categoryOptions = [
    { value: 'company-news', label: 'Noticias de la Empresa' },
    { value: 'employee-spotlight', label: 'Empleado Destacado' },
    { value: 'benefits', label: 'Beneficios' },
    { value: 'wellness', label: 'Bienestar' },
    { value: 'training', label: 'Capacitación' },
    { value: 'events', label: 'Eventos' },
    { value: 'announcements', label: 'Anuncios' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Borrador' },
    { value: 'published', label: 'Publicado' },
    { value: 'scheduled', label: 'Programado' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newAttachments = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...newAttachments]
    }));
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        featuredImage: imageUrl
      }));
    }
  };

  const removeAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter(att => att?.id !== attachmentId)
    }));
  };

  const insertImage = () => {
    const imageUrl = prompt('Ingrese la URL de la imagen:');
    if (imageUrl) {
      const textarea = document.getElementById('content-editor');
      const cursorPos = textarea?.selectionStart;
      const textBefore = formData?.content?.substring(0, cursorPos);
      const textAfter = formData?.content?.substring(cursorPos);
      const newContent = textBefore + `\n![Imagen](${imageUrl})\n` + textAfter;
      
      handleInputChange('content', newContent);
    }
  };

  const formatText = (format) => {
    const textarea = document.getElementById('content-editor');
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = formData?.content?.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText}`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = formData?.content?.substring(0, start) + formattedText + formData?.content?.substring(end);
    handleInputChange('content', newContent);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {isEditing ? 'Editar Entrada de Blog' : 'Nueva Entrada de Blog'}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              iconName={showPreview ? "Edit" : "Eye"}
              iconPosition="left"
            >
              {showPreview ? 'Editar' : 'Vista Previa'}
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <Input
            label="Título del Post"
            type="text"
            placeholder="Ingrese el título del blog post"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />

          {/* Formatting Toolbar */}
          <div className="border border-border rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText('bold')}
                iconName="Bold"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText('italic')}
                iconName="Italic"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText('heading')}
                iconName="Heading"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText('list')}
                iconName="List"
                iconSize={16}
              />
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant="ghost"
                size="sm"
                onClick={insertImage}
                iconName="Image"
                iconSize={16}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef?.current?.click()}
                iconName="Paperclip"
                iconSize={16}
              />
            </div>

            {showPreview ? (
              <div className="min-h-96 p-4 bg-muted rounded-md">
                <h3 className="text-lg font-semibold mb-4">{formData?.title || 'Título del Post'}</h3>
                <div className="prose max-w-none">
                  {formData?.content?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="mb-2 text-foreground">
                      {paragraph?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>')?.replace(/## (.*)/g, '<h2>$1</h2>')}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <textarea
                id="content-editor"
                className="w-full min-h-96 p-4 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Escriba el contenido de su blog post aquí...\n\nPuede usar:\n**texto en negrita**\n*texto en cursiva*\n## Encabezados\n- Listas"
                value={formData?.content}
                onChange={(e) => handleInputChange('content', e?.target?.value)}
              />
            )}
          </div>

          {/* File Attachments */}
          {formData?.attachments?.length > 0 && (
            <div className="border border-border rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Archivos Adjuntos</h4>
              <div className="space-y-2">
                {formData?.attachments?.map((attachment) => (
                  <div key={attachment?.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center space-x-3">
                      <Icon name="File" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{attachment?.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(attachment?.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(attachment?.id)}
                      iconName="X"
                      iconSize={14}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Publishing Controls */}
        <div className="space-y-6">
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Configuración de Publicación</h3>
            
            <div className="space-y-4">
              <Select
                label="Estado"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
              />

              <Select
                label="Categoría"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
                placeholder="Seleccione una categoría"
              />

              <Input
                label="Fecha de Publicación"
                type="date"
                value={formData?.publishDate}
                onChange={(e) => handleInputChange('publishDate', e?.target?.value)}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Imagen Destacada</h3>
            
            {formData?.featuredImage ? (
              <div className="space-y-3">
                <div className="aspect-video bg-background rounded-md overflow-hidden">
                  <Image
                    src={formData?.featuredImage}
                    alt="Imagen destacada"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('featuredImage', '')}
                  iconName="Trash2"
                  iconPosition="left"
                  className="w-full"
                >
                  Remover Imagen
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => imageInputRef?.current?.click()}
                iconName="Upload"
                iconPosition="left"
                className="w-full"
              >
                Subir Imagen
              </Button>
            )}
            
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              className="w-full"
            >
              {isEditing ? 'Actualizar Post' : 'Guardar Post'}
            </Button>
            
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;