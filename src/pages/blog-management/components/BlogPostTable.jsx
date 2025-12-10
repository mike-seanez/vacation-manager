import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogPostTable = ({ 
  posts = [], 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onView 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);


  // const sortOptions = [
  //   { value: 'date', label: 'Fecha' },
  //   { value: 'title', label: 'Título' },
  //   { value: 'author', label: 'Autor' },
  //   { value: 'views', label: 'Visualizaciones' }
  // ];

  const filteredAndSortedPosts = posts?.filter(post => {
      const matchesSearch = post?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           post?.author?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = statusFilter === 'all' || post?.status === statusFilter;
      return matchesSearch && matchesStatus;
    })?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'date') {
        aValue = new Date(a.publishDate);
        bValue = new Date(b.publishDate);
      } else if (sortBy === 'views') {
        aValue = parseInt(a?.views) || 0;
        bValue = parseInt(b?.views) || 0;
      } else {
        aValue = aValue?.toString()?.toLowerCase() || '';
        bValue = bValue?.toString()?.toLowerCase() || '';
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      onDelete(postToDelete?.id);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date?.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-semibold text-foreground">Entradas de Blog</h2>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="search"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Post</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Autor</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Fecha</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedPosts?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-8">
                  <div className="flex flex-col items-center space-y-3">
                    <Icon name="FileText" size={48} className="text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== 'all' ?'No se encontraron posts con los filtros aplicados' :'No hay posts de blog creados aún'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAndSortedPosts?.map((post) => (
                <tr key={post?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {post?.cover_image && (
                        <div className="w-12 h-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={post?.cover_image}
                            alt={post?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {post?.title}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={14} color="white" />
                      </div>
                      <span className="text-sm text-foreground">{post?.author?.full_name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{formatDate(post?.created_at)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(post)}
                        iconName="Eye"
                        iconSize={14}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(post)}
                        iconName="Edit"
                        iconSize={14}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(post)}
                        iconName="Trash2"
                        iconSize={14}
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-400">
          <div className="bg-card rounded-lg border border-border shadow-elevation-3 p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Eliminar Post</h3>
                <p className="text-sm text-muted-foreground">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <p className="text-sm text-foreground mb-6">
              ¿Está seguro de que desea eliminar el post "{postToDelete?.title}"?
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                iconName="Trash2"
                iconPosition="left"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostTable;