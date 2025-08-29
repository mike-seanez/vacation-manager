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


const BlogManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [previewPost, setPreviewPost] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('es');

  // Mock blog posts data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Nuevas Políticas de Vacaciones 2024",
      content: `## Cambios Importantes en las Políticas de Vacaciones\n\nEstamos emocionados de anunciar las nuevas políticas de vacaciones que entrarán en vigor a partir del 1 de enero de 2024.\n\n**Principales cambios:**\n- Aumento en días de vacaciones para empleados con más de 5 años\n- Flexibilidad para tomar días fraccionados\n- Nuevo sistema de solicitud digital\n\n### Beneficios Adicionales\n\nAdemás de los cambios en las políticas, hemos implementado:\n\n- **Días de bienestar mental**: 2 días adicionales al año\n- **Vacaciones familiares**: Tiempo extra para eventos familiares importantes\n- **Trabajo remoto**: Opción de trabajar desde casa durante vacaciones parciales\n\nEstos cambios reflejan nuestro compromiso con el bienestar de nuestros empleados y el equilibrio vida-trabajo.`,
      author: "María González",
      status: "published",
      category: "company-news",
      publishDate: "2024-01-15",
      featuredImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
      views: 1247,
      attachments: [
        {
          id: 1,
          name: "Política_Vacaciones_2024.pdf",
          size: 2048576,
          type: "application/pdf",
          url: "#"
        }
      ]
    },
    {
      id: 2,
      title: "Empleado del Mes: Carlos Rodríguez",
      content: `## Reconocimiento a la Excelencia\n\nNos complace anunciar que **Carlos Rodríguez** del departamento de Desarrollo ha sido seleccionado como Empleado del Mes de Enero 2024.\n\n### Logros Destacados\n\nCarlos ha demostrado un desempeño excepcional en:\n\n- Liderazgo del proyecto de modernización del sistema\n- Mentoría a nuevos desarrolladores\n- Implementación de mejores prácticas de código\n- Colaboración interdepartamental\n\n*"Carlos siempre va más allá de lo esperado y su actitud positiva inspira a todo el equipo"* - Ana Martínez, Gerente de Desarrollo\n\n### Reconocimiento\n\nComo reconocimiento a su excelente trabajo, Carlos recibirá:\n- Bono especial de $5,000 MXN\n- Día libre adicional\n- Estacionamiento preferencial por un mes\n- Certificado de reconocimiento\n\n¡Felicidades Carlos por tu dedicación y excelencia!`,
      author: "Ana Martínez",
      status: "published",
      category: "employee-spotlight",
      publishDate: "2024-01-20",
      featuredImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      views: 892,
      attachments: []
    },
    {
      id: 3,
      title: "Programa de Bienestar Corporativo 2024",
      content: `## Cuidando la Salud de Nuestro Equipo\n\nEn VacaBlog Manager, la salud y bienestar de nuestros empleados es una prioridad. Por eso, hemos diseñado un programa integral de bienestar para 2024.\n\n### Componentes del Programa\n\n**Salud Física:**\n- Membresías de gimnasio subsidiadas al 70%\n- Clases de yoga y pilates en la oficina\n- Evaluaciones médicas anuales gratuitas\n- Programa de nutrición personalizada\n\n**Salud Mental:**\n- Sesiones de terapia psicológica cubiertas\n- Talleres de manejo del estrés\n- Espacios de meditación en la oficina\n- Días de salud mental\n\n**Equilibrio Vida-Trabajo:**\n- Horarios flexibles\n- Trabajo remoto híbrido\n- Viernes de medio día en verano\n- Actividades familiares trimestrales\n\n### Cómo Participar\n\nTodos los empleados pueden inscribirse a través del portal de recursos humanos. Las inscripciones estarán abiertas hasta el 15 de febrero.\n\n¡Tu bienestar es nuestro compromiso!`,
      author: "Dr. Patricia López",
      status: "scheduled",
      category: "wellness",
      publishDate: "2024-02-01",
      featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      views: 0,
      attachments: [
        {
          id: 2,
          name: "Programa_Bienestar_2024.pdf",
          size: 3145728,
          type: "application/pdf",
          url: "#"
        },
        {
          id: 3,
          name: "Formulario_Inscripcion.docx",
          size: 1048576,
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          url: "#"
        }
      ]
    },
    {
      id: 4,
      title: "Capacitación en Nuevas Tecnologías",
      content: `## Invirtiendo en el Futuro de Nuestro Equipo\n\nLa tecnología evoluciona constantemente, y nosotros también. Anunciamos nuestro programa de capacitación en nuevas tecnologías para 2024.\n\n### Cursos Disponibles\n\n**Desarrollo Web:**\n- React 18 y Next.js 14\n- TypeScript avanzado\n- Arquitectura de microservicios\n- DevOps y CI/CD\n\n**Inteligencia Artificial:**\n- Machine Learning con Python\n- Procesamiento de lenguaje natural\n- Visión por computadora\n- Ética en IA\n\n**Gestión de Proyectos:**\n- Metodologías ágiles avanzadas\n- Scrum Master certification\n- Liderazgo técnico\n- Gestión de equipos remotos\n\n### Beneficios del Programa\n\n- **100% financiado** por la empresa\n- Horarios flexibles de estudio\n- Certificaciones oficiales\n- Incremento salarial por certificación completada\n- Oportunidades de promoción interna\n\n### Inscripciones\n\nLas inscripciones abren el 1 de febrero. Los cupos son limitados, así que no esperes para registrarte.\n\n¡Construyamos juntos el futuro de la tecnología!`,
      author: "Ing. Roberto Sánchez",
      status: "draft",
      category: "training",
      publishDate: "2024-02-05",
      featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      views: 0,
      attachments: []
    },
    {
      id: 5,
      title: "Celebración del Día de la Mujer 2024",
      content: `## Honrando a las Mujeres de VacaBlog Manager\n\nEn el marco del Día Internacional de la Mujer, queremos reconocer y celebrar a todas las mujeres extraordinarias que forman parte de nuestro equipo.\n\n### Evento Especial\n\n**Fecha:** 8 de marzo de 2024\n**Hora:** 2:00 PM - 6:00 PM\n**Lugar:** Auditorio principal\n\n### Programa del Evento\n\n**2:00 PM - 2:30 PM:** Bienvenida y palabras de la CEO\n**2:30 PM - 3:30 PM:** Panel "Liderazgo Femenino en Tecnología"\n**3:30 PM - 4:00 PM:** Coffee break y networking\n**4:00 PM - 5:00 PM:** Taller "Desarrollo profesional y empoderamiento"\n**5:00 PM - 6:00 PM:** Reconocimientos y brindis\n\n### Panelistas Invitadas\n\n- **Dra. Elena Vásquez** - CTO de TechMex\n- **Lic. Carmen Ruiz** - Directora de Innovación en StartupMX\n- **Ing. Sofía Morales** - Fundadora de WomenInTech México\n\n### Reconocimientos Especiales\n\nDurante el evento, reconoceremos a las mujeres de nuestro equipo que han destacado por:\n- Liderazgo e innovación\n- Mentoría y desarrollo de talento\n- Contribuciones excepcionales a proyectos\n- Compromiso con la diversidad e inclusión\n\n¡Celebremos juntos la fuerza, talento y dedicación de nuestras compañeras!`,
      author: "Lic. Isabel Hernández",
      status: "published",
      category: "events",
      publishDate: "2024-03-01",
      featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
      views: 654,
      attachments: []
    }
  ]);

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditor(true);
    setPreviewPost(null);
  };

  const handleSavePost = (postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
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
            author: "Admin User",
            views: 0,
            attachments: postData.attachments || []
          };
          setBlogPosts(prev => [newPost, ...prev]);
        }
        
        setShowEditor(false);
        setEditingPost(null);
        resolve();
      }, 1000);
    });
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
      <NavigationHeader onMenuToggle={handleMenuToggle} />
      
      <RoleBasedSidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        userRole="admin"
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
                Crea, edita y publica contenido para el blog corporativo
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="BarChart3"
                iconPosition="left"
              >
                Analíticas
              </Button>
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
              <QuickActionPanel userRole="admin" className="mb-6" />
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