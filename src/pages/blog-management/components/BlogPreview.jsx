import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogPreview = ({ post, onClose, onEdit }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'company-news': 'Noticias de la Empresa',
      'employee-spotlight': 'Empleado Destacado',
      'benefits': 'Beneficios',
      'wellness': 'Bienestar',
      'training': 'Capacitación',
      'events': 'Eventos',
      'announcements': 'Anuncios'
    };
    return categories?.[category] || category;
  };

  const renderContent = (content) => {
    return content?.split('\n')?.map((paragraph, index) => {
      if (paragraph?.trim() === '') return <br key={index} />;
      
      // Handle images
      if (paragraph?.includes('![') && paragraph?.includes('](')) {
        const imageMatch = paragraph?.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          return (
            <div key={index} className="my-6">
              <Image
                src={imageMatch?.[2]}
                alt={imageMatch?.[1]}
                className="w-full rounded-lg shadow-elevation-1"
              />
            </div>
          );
        }
      }
      
      // Handle headings
      if (paragraph?.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
            {paragraph?.replace('## ', '')}
          </h2>
        );
      }
      
      // Handle lists
      if (paragraph?.startsWith('- ')) {
        return (
          <li key={index} className="text-foreground mb-1 ml-4">
            {paragraph?.replace('- ', '')}
          </li>
        );
      }
      
      // Handle bold and italic text
      let formattedText = paragraph?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return (
        <p 
          key={index} 
          className="text-foreground mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-400 p-4">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Eye" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Vista Previa del Post</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(post)}
              iconName="Edit"
              iconPosition="left"
            >
              Editar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <article className="p-6">
            {/* Featured Image */}
            {post?.featuredImage && (
              <div className="mb-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={post?.featuredImage}
                    alt={post?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Post Header */}
            <header className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {getCategoryLabel(post?.category)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(post?.publishDate)}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {post?.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={14} color="white" />
                  </div>
                  <span>Por {post?.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{post?.views || 0} visualizaciones</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{Math.ceil(post?.content?.split(' ')?.length / 200)} min de lectura</span>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div className="prose max-w-none">
              {renderContent(post?.content)}
            </div>

            {/* Attachments */}
            {post?.attachments && post?.attachments?.length > 0 && (
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Archivos Adjuntos
                </h3>
                <div className="space-y-2">
                  {post?.attachments?.map((attachment) => (
                    <div key={attachment?.id} className="flex items-center space-x-3 p-2 bg-card rounded-md">
                      <Icon name="File" size={16} className="text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{attachment?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(attachment?.size / 1024 / 1024)?.toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        iconSize={14}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Post Footer */}
            <footer className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Heart"
                    iconPosition="left"
                  >
                    Me gusta
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Comentar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Compartir
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Publicado el {formatDate(post?.publishDate)}
                </div>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;