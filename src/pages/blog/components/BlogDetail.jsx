import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogDetail = ({ post }) => {
  const navigate = useNavigate();
  const authorName = typeof post?.author === 'object' ? post?.author?.full_name : post?.author;
  
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <Icon name="FileQuestion" size={64} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Artículo no encontrado</h2>
        <p className="text-muted-foreground mb-6 text-center">El artículo que estás buscando no existe o ha sido eliminado.</p>
        <Button onClick={() => navigate('/blog')} iconName="ArrowLeft" iconPosition="left">
          Volver al Blog
        </Button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks) || blocks?.length === 0) {
      return renderContent(post?.content);
    }

    const ordered = [...blocks]?.sort((a, b) => (a?.position ?? 0) - (b?.position ?? 0));

    return ordered?.map((block) => {
      if (block?.block_type === 'image' && block?.image_url) {
        return (
          <div key={`block-${block?.id || block?.position}`} className="my-6">
            <Image
              src={block?.image_url}
              alt={post?.title || 'Blog image'}
              className="w-full rounded-lg shadow-elevation-1"
            />
          </div>
        );
      }

      return (
        <p key={`block-${block?.id || block?.position}`} className="text-foreground mb-4 leading-relaxed">
          {block?.content}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-elevation-1 overflow-hidden">
      {/* Back button */}
      <div className="p-4 border-b border-border">
        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Icon name="ArrowLeft" size={16} className="mr-1" />
          Volver al Blog
        </Link>
      </div>

      {/* Cover image */}
      {(post?.cover_image || post?.coverImage) && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <Image 
            src={post?.cover_image || post?.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article content */}
      <article className="p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center">
              <Icon name="User" size={14} className="mr-1" />
              <span>{authorName || 'Desconocido'}</span>
            </div>
            
            <div className="flex items-center">
              <Icon name="Calendar" size={14} className="mr-1" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
        </header>

        {/* Post Content */}
        <div className="prose max-w-none">
          {renderBlocks(post?.blog_blocks)}
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
      </article>
    </div>
  );
};

export default BlogDetail;
