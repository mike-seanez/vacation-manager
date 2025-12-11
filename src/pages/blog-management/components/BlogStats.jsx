import React from 'react';
import Icon from '../../../components/AppIcon';

const BlogStats = ({ posts = [] }) => {
  const totalPosts = posts?.length;  
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
      title: 'Posts Este Mes',
      value: thisMonthPosts,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
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