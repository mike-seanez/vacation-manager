import React, { useState } from 'react';
import BlogCard from './BlogCard';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BlogList = ({ posts = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categoryOptions = [
    { value: 'all', label: 'Todas las Categorías' },
    { value: 'company-news', label: 'Noticias de la Empresa' },
    { value: 'employee-spotlight', label: 'Empleado Destacado' },
    { value: 'benefits', label: 'Beneficios' },
    { value: 'wellness', label: 'Bienestar' },
    { value: 'training', label: 'Capacitación' },
    { value: 'events', label: 'Eventos' },
    { value: 'announcements', label: 'Anuncios' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Más Recientes' },
    { value: 'date-asc', label: 'Más Antiguos' },
    { value: 'title-asc', label: 'Título (A-Z)' },
    { value: 'title-desc', label: 'Título (Z-A)' }
  ];

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      // Only show published posts
      if (post.status !== 'published') return false;
      
      // Filter by search term
      const matchesSearch = post?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          post?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          post?.author?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      // Filter by category
      const matchesCategory = categoryFilter === 'all' || post?.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by selected option
      if (sortBy === 'date-desc') {
        return new Date(b.publishDate) - new Date(a.publishDate);
      } else if (sortBy === 'date-asc') {
        return new Date(a.publishDate) - new Date(b.publishDate);
      } else if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Filters */}
      {/* <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Buscar en el blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            iconName="Search"
            iconPosition="left"
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onChange={(value) => setCategoryFilter(value)}
            placeholder="Filtrar por categoría"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(value) => setSortBy(value)}
            placeholder="Ordenar por"
          />
        </div>
      </div> */}

      {/* Results count */}
      {/* <div className="text-sm text-muted-foreground">
        Mostrando {filteredAndSortedPosts.length} de {posts.filter(post => post.status === 'published').length} artículos
      </div> */}

      {/* Blog grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron artículos</h3>
          {/* <p className="text-muted-foreground">
            No hay artículos que coincidan con tu búsqueda. Intenta con otros términos o filtros.
          </p> */}
        </div>
      )}
    </div>
  );
};

export default BlogList;