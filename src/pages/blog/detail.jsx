import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogDetail from "./components/BlogDetail";
import NavigationHeader from "../../components/ui/NavigationHeader";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import { useBlog } from "../../domain/UseCases/blogCases/useBlog";
import { useGetUser } from "../../hooks/useGetUser";
import RoleBasedSidebar from "../../components/ui/RoleBasedSidebar";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getBlogEntryById } = useBlog();
  const currentUser = useGetUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data - In a real application, this would come from an API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogEntryById(Number(id));
        const normalized = Array.isArray(data) ? data?.[0] : data;
        setPost(normalized);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const breadcrumbs = [
    { label: "Inicio", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: post?.title || "Artículo", path: `/blog/${id}` },
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
      <NavigationHeader onMenuToggle={handleToggleSidebar} user={currentUser} />
      <RoleBasedSidebar
        isOpen={sidebarOpen}
        isCollapsedProp={sidebarCollapsed}
        onClose={handleCloseSidebar}
        userRole={currentUser?.role_id} // This will work for any role as per requirement
      />
      <main
        className={`pt-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto transition-layout ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"
        }`}
      >
        <div className="py-8">
          <BreadcrumbTrail customBreadcrumbs={breadcrumbs} />

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <BlogDetail post={post} />
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;
