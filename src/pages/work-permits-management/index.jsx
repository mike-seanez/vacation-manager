import { useState, useEffect } from "react";
import Button from "components/ui/Button";
import NavigationHeader from "../../components/ui/NavigationHeader";
import RoleBasedSidebar from "../../components/ui/RoleBasedSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import { useGetUser } from "../../hooks/useGetUser";
import { useWorkPermit } from "../../domain/UseCases/workPermitCases/useWorkPermit";

const WorkPermitsManagement = () => {
  const [allPermits, setAllPermits] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const currentUser = useGetUser();
  const { getWorkPermits, acceptWorkPermit, rejectWorkPermit } = useWorkPermit();

  useEffect(() => {
    const fetchAllPermits = async () => {
      try {
        const permits = await getWorkPermits();
        setAllPermits(permits);
      } catch (error) {
        alert("Error al obtener los permisos");
      }
    };
    fetchAllPermits();
  }, []);

  const onAccept = async (permits) => {
    try {
      await acceptWorkPermit(permits.id);
      setAllPermits(prev => prev?.map(post => 
        post?.id === permits?.id 
          ? { ...post, status: 'approved' }
          : post
      ));
    } catch (error) {
      alert("Error al aprobar el permiso");
    }
  };

  const onReject = async (permits) => {
    try {
      await rejectWorkPermit(permits.id);
      setAllPermits(prev => prev?.map(post => 
        post?.id === permits?.id 
          ? { ...post, status: 'rejected' }
          : post
      ));
    } catch (error) {
      alert("Error al rechazar el permiso");
    }
  };

  const breadcrumbs = [
    { label: "Inicio", path: "/" },
    { label: "Gestión de Permisos", path: "/work-permits-management" },
  ];

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date?.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`1970-01-01T${timeString}`);
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader onMenuToggle={handleToggleSidebar} user={currentUser} />
      <RoleBasedSidebar
        isOpen={sidebarOpen}
        isCollapsedProp={sidebarCollapsed}
        onClose={handleCloseSidebar}
        userRole={currentUser?.role_id}
      />
      <main
        className={`pt-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto transition-layout ${
          sidebarCollapsed ? "lg:pl-16" : "lg:pl-72"
        }`}
      >
        <div className="py-8">
          <BreadcrumbTrail customBreadcrumbs={breadcrumbs} />

          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Gestión de Permisos de Trabajo</h1>
            <p className="text-muted-foreground mt-1">Administra los permisos solicitados por los empleados</p>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border">
                    <th className="py-2 px-3 text-muted-foreground">ID</th>
                    <th className="py-2 px-3 text-muted-foreground">Usuario</th>
                    <th className="py-2 px-3 text-muted-foreground">Fecha</th>
                    <th className="py-2 px-3 text-muted-foreground">Hora de inicio</th>
                    <th className="py-2 px-3 text-muted-foreground">Hora de fin</th>
                    <th className="py-2 px-3 text-muted-foreground">Estado</th>
                    <th className="py-2 px-3 text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {allPermits?.map((permits) => (
                    <tr key={permits?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                      <td className="py-2 px-3 text-foreground">{permits?.id}</td>
                      <td className="py-2 px-3 text-foreground">{permits?.user_id}</td>
                      <td className="py-2 px-3 text-foreground">{formatDate(permits?.permit_date)}</td>
                      <td className="py-2 px-3 text-foreground">{formatTime(permits?.start_time)}</td>
                      <td className="py-2 px-3 text-foreground">{formatTime(permits?.end_time)}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          permits?.status === 'approved' ? 'bg-success text-success-foreground' :
                          permits?.status === 'rejected' ? 'bg-destructive text-destructive-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {permits?.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 flex gap-2">
                        {permits?.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => onAccept(permits)} iconName="Check" iconPosition="left" iconSize={14}>
                              Aprobar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => onReject(permits)} iconName="X" iconPosition="left" iconSize={14}>
                              Rechazar
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export default WorkPermitsManagement;
