import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogCard = ({ post }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date?.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // const getCategoryLabel = (category) => {
  //   const categories = {
  //     'company-news': 'Noticias de la Empresa',
  //     'employee-spotlight': 'Empleado Destacado',
  //     'benefits': 'Beneficios',
  //     'wellness': 'Bienestar',
  //     'training': 'Capacitación',
  //     'events': 'Eventos',
  //     'announcements': 'Anuncios'
  //   };
  //   return categories?.[category] || category;
  // };

  // Calculate reading time based on word count (average reading speed: 200 words per minute)
  // const readingTime = Math.ceil(post?.content?.split(' ')?.length / 200);

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 overflow-hidden transition-all duration-300 hover:shadow-elevation-2 h-full flex flex-col">
      {post?.cover_image && (
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={post.cover_image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.content?.replace(/\*\*(.*?)\*\*/g, '$1')?.replace(/\*(.*?)\*/g, '$1')?.replace(/## (.*)/g, '$1')?.split('\n')[0]}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="User" size={14} />
            <span>{post.author?.full_name}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(post.created_at)}</span>
          </div>
          
          {/* <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{readingTime} min</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;