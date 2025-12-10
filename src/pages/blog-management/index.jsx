import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import BlogEditor from './components/BlogEditor';
import BlogPostTable from './components/BlogPostTable';
import BlogStats from './components/BlogStats';
import BlogPreview from './components/BlogPreview';
import Button from '../../components/ui/Button';
import { useGetUser } from '../../hooks/useGetUser';
import { useBlog } from '../../domain/UseCases/blogCases/useBlog';

const BlogManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const currentUser = useGetUser();
  const {getBlogs, createBlog} = useBlog();

  // Mock blog posts data
  const [blogPosts, setBlogPosts] = useState([]);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentLanguage(savedLanguage);

    const getData = async () => {
      const response = await getBlogs();
      setBlogPosts(response || []);
    };
    getData();
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleNewPost = () => {
    console.log('blogPosts', blogPosts)
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditor(true);
    setPreviewPost(null);
  };

  const handleSavePost = async (postData) => {
        if (editingPost) {
          // Update existing post
          setBlogPosts(prev => prev.map(post => 
            post.id === editingPost.id 
              ? { ...post, ...postData, id: editingPost.id }
              : post
          ));
        } else {
          // Create new post
          const newPost = {
            ...postData,
            id: Date.now(),
            author_id: currentUser?.id,
          };
          setBlogPosts(prev => [newPost, ...prev]);
          await createBlog(newPost);
        }
        
        setShowEditor(false);
        setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    setBlogPosts(prev => prev?.filter(post => post?.id !== postId));
  };

  const handleStatusChange = (postId, newStatus) => {
    setBlogPosts(prev => prev?.map(post => 
      post?.id === postId 
        ? { ...post, status: newStatus }
        : post
    ));
  };

  const handleViewPost = (post) => {
    setPreviewPost(post);
  };

  const handleClosePreview = () => {
    setPreviewPost(null);
  };

  const breadcrumbs = [
    { label: 'Inicio', path: '/administrator-dashboard', isActive: false },
    { label: 'Gestión de Blog', path: '/blog-management', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader onMenuToggle={handleMenuToggle} user={currentUser} />
      
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        userRole={currentUser?.role_id}
      />

      <main className={`transition-layout ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <div className="p-6">
          <BreadcrumbTrail customBreadcrumbs={breadcrumbs} />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Gestión de Blog
              </h1>
              <p className="text-muted-foreground">
                Crea, edita y publica contenido para el blog
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="default"
                onClick={handleNewPost}
                iconName="Plus"
                iconPosition="left"
              >
                Nuevo Post
              </Button>
            </div>
          </div>

          {!showEditor && (
            <>
              <BlogStats posts={blogPosts} />
              {/* <QuickActionPanel userRole={currentUser?.role_id} className="mb-6" /> */}
              <BlogPostTable
                posts={blogPosts}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onStatusChange={handleStatusChange}
                onView={handleViewPost}
              />
            </>
          )}

          {showEditor && (
            <BlogEditor
              post={editingPost}
              onSave={handleSavePost}
              onCancel={handleCancelEdit}
              isEditing={!!editingPost}
            />
          )}

          {previewPost && (
            <BlogPreview
              post={previewPost}
              onClose={handleClosePreview}
              onEdit={handleEditPost}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogManagement;