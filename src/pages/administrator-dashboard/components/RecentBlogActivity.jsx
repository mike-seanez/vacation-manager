import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentBlogActivity = () => {
  const recentPosts = [
    {
      id: 1,
      title: "Nuevas Políticas de Vacaciones 2025",
      author: "Admin Sistema",
      publishDate: "2025-01-28",
      status: "published",
      views: 156,
      comments: 8,
      category: "Políticas"
    },
    {
      id: 2,
      title: "Celebración del Día del Trabajador",
      author: "María González",
      publishDate: "2025-01-25",
      status: "draft",
      views: 0,
      comments: 0,
      category: "Eventos"
    },
    {
      id: 3,
      title: "Tips para Solicitar Vacaciones",
      author: "Carlos Rodríguez",
      publishDate: "2025-01-22",
      status: "published",
      views: 89,
      comments: 12,
      category: "Guías"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-success';
      case 'draft': return 'text-warning';
      case 'scheduled': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return 'CheckCircle';
      case 'draft': return 'Edit';
      case 'scheduled': return 'Clock';
      default: return 'FileText';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Borrador';
      case 'scheduled': return 'Programado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Actividad del Blog</h3>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Nueva Entrada
        </Button>
      </div>
      <div className="space-y-4">
        {recentPosts?.map((post) => (
          <div key={post?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1 line-clamp-1">{post?.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Por {post?.author}</span>
                  <span>{new Date(post.publishDate)?.toLocaleDateString('es-MX')}</span>
                  <span className="px-2 py-1 bg-muted rounded-full text-xs">{post?.category}</span>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(post?.status)}`}>
                <Icon name={getStatusIcon(post?.status)} size={16} />
                <span className="text-sm font-medium">{getStatusText(post?.status)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={16} />
                  <span>{post?.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MessageSquare" size={16} />
                  <span>{post?.comments}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" iconName="Edit">
                  Editar
                </Button>
                {post?.status === 'published' && (
                  <Button variant="ghost" size="sm" iconName="Eye">
                    Ver
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-sm text-muted-foreground">Entradas Totales</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">1.2K</p>
            <p className="text-sm text-muted-foreground">Vistas Este Mes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">89</p>
            <p className="text-sm text-muted-foreground">Comentarios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogActivity;