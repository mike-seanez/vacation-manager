import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import { useGetUser } from '../../hooks/useGetUser';
import { useBlog } from '../../domain/UseCases/blogCases/useBlog';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const currentUser = useGetUser();
  const { getBlogs } = useBlog();

  // Mock data - In a real application, this would come from an API
  useEffect(() => {
    const fetchData = async () => {
      const response = await getBlogs();
      setBlogPosts(response || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const breadcrumbs = [
    { label: 'Inicio', path: '/' },
    { label: 'Blog', path: '/blog' }
  ];

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  
  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        onMenuToggle={handleToggleSidebar}
        user={currentUser}
      />
      <RoleBasedSidebar
        isOpen={sidebarOpen}
        isCollapsedProp={sidebarCollapsed}
        onClose={handleCloseSidebar}
        userRole={currentUser?.role_id} // This will work for any role as per requirement
      />
      <main className={`pt-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto transition-layout ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'}`}>
        <div className="py-8">
          <BreadcrumbTrail customBreadcrumbs={breadcrumbs} />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Blog</h1>
            <p className="text-muted-foreground">
              Mantente informado sobre las últimas noticias, eventos y actualizaciones de la empresa
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <BlogList posts={blogPosts} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;