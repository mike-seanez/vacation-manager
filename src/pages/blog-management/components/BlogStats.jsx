import React from 'react';
import Icon from '../../../components/AppIcon';

const BlogStats = ({ posts = [] }) => {
  const totalPosts = posts?.length;
  const publishedPosts = posts?.filter(post => post?.status === 'published')?.length;
  const draftPosts = posts?.filter(post => post?.status === 'draft')?.length;
  const scheduledPosts = posts?.filter(post => post?.status === 'scheduled')?.length;
  const totalViews = posts?.reduce((sum, post) => sum + (post?.views || 0), 0);
  
  const averageViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;
  
  const thisMonthPosts = posts?.filter(post => {
    const postDate = new Date(post.publishDate);
    const now = new Date();
    return postDate?.getMonth() === now?.getMonth() && 
           postDate?.getFullYear() === now?.getFullYear();
  })?.length;

  const stats = [
    {
      title: 'Total de Posts',
      value: totalPosts,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Posts Publicados',
      value: publishedPosts,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Borradores',
      value: draftPosts,
      icon: 'Edit',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Programados',
      value: scheduledPosts,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Total de Vistas',
      value: totalViews?.toLocaleString('es-MX'),
      icon: 'Eye',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Promedio de Vistas',
      value: averageViews?.toLocaleString('es-MX'),
      icon: 'TrendingUp',
      color: 'text-foreground',
      bgColor: 'bg-muted'
    },
    {
      title: 'Posts Este Mes',
      value: thisMonthPosts,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Tasa de Publicación',
      value: totalPosts > 0 ? `${Math.round((publishedPosts / totalPosts) * 100)}%` : '0%',
      icon: 'BarChart3',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogStats;