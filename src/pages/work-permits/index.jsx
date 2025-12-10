import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../../components/ui/NavigationHeader";
import RoleBasedSidebar from "../../components/ui/RoleBasedSidebar";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import { useGetUser } from '../../hooks/useGetUser';
import { useWorkPermit } from '../../domain/UseCases/workPermitCases/useWorkPermit';
import Button from "components/ui/Button";

const WorkPermits = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    permit_date: new Date().toISOString().split("T")[0],
    start_time: "",
    end_time: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const currentUser = useGetUser();
  const [myPermits, setMyPermits] = useState([]);
  const { getWorkPermitsByUserId, createWorkPermit, deleteWorkPermit } = useWorkPermit();

  useEffect(() => {
    console.log('el useeffect')
    const fetchMyPermits = async () => {
      console.log('la funct');
      
      try {
        const permits = await getWorkPermitsByUserId();
        setMyPermits(permits);
      } catch (error) {
        console.error("Error fetching work permits:", error);
      }
    };
    fetchMyPermits();
  }, []);

  const breadcrumbs = [
    { label: "Inicio", path: "/" },
    { label: "Permisos Laborales", path: "/work-permits" },
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

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.reason?.trim()) {
      alert("Por favor ingrese el motivo de la solicitud");
      return;
    }
    if (!formData?.start_time || !formData?.end_time) {
      alert("Por favor seleccione la hora de inicio y fin del permiso");
      return;
    }
    if (formData?.start_time && formData?.end_time && formData.start_time > formData.end_time) {
      alert("La hora de fin debe ser posterior a la hora de inicio");
      return;
    }

    setIsSubmitting(true);
    try {
      await createWorkPermit({
        user_id: currentUser?.id,
        permit_date: formData?.permit_date,
        start_time: formData?.start_time,
        end_time: formData?.end_time,
        reason: formData?.reason,
      });
      alert("Solicitud de permiso enviada exitosamente");
      setFormData({
        permit_date: new Date().toISOString().split("T")[0],
        start_time: "",
        end_time: "",
        reason: "",
      });
      setMyPermits((prev) => [...prev, {
        user_id: currentUser?.id,
        permit_date: formData?.permit_date,
        start_time: formData?.start_time,
        end_time: formData?.end_time,
        reason: formData?.reason,
      }]);
    } catch (error) {
      alert("Error al enviar la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (permit) => {
    try {
      await deleteWorkPermit(permit?.id);
      setMyPermits((prev) => prev?.filter(post => post?.id !== permit?.id));
    } catch (error) {
      alert("Error al eliminar el permiso");
    }
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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Solicitud de Permiso Laboral
            </h1>
            <p className="text-muted-foreground">
              Solicite permiso para llegar tarde o salir temprano
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label
                    htmlFor="permit_date"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Fecha del permiso
                  </label>
                  <input
                    id="permit_date"
                    type="permit_date"
                  value={formData?.permit_date}
                  onChange={(e) => handleFormChange("permit_date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Hora de inicio
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={formData?.start_time}
                    onChange={(e) => handleFormChange("start_time", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Hora de fin
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={formData?.end_time}
                    onChange={(e) => handleFormChange("end_time", e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Motivo de la solicitud
                </label>
                <textarea
                  id="reason"
                  value={formData?.reason}
                  onChange={(e) => handleFormChange("reason", e.target.value)}
                  placeholder="Describa el motivo por el cual necesita el permiso..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                </button>
              </div>
            </form>
          </div>
        </div>

          <div className="mt-8 bg-card rounded-lg border border-border shadow-elevation-1 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Permisos enviados previamente</h2>
            {Array.isArray(myPermits) && myPermits?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="py-2 px-3 text-muted-foreground">Fecha</th>
                      <th className="py-2 px-3 text-muted-foreground">Inicio</th>
                      <th className="py-2 px-3 text-muted-foreground">Fin</th>
                      <th className="py-2 px-3 text-muted-foreground">Motivo</th>
                      <th className="py-2 px-3 text-muted-foreground">Estado</th>
                      <th className="py-2 px-3 text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPermits?.map((permit) => (
                      <tr key={permit?.id || `${permit?.permit_date}-${permit?.start_time}-${permit?.end_time}`} className="border-b border-border hover:bg-muted/50 transition-smooth">
                        <td className="py-2 px-3 text-foreground">
                          {permit?.permit_date ? new Date(permit?.permit_date)?.toLocaleDateString('es-MX') : ''}
                        </td>
                        <td className="py-2 px-3 text-foreground">{permit?.start_time || ''}</td>
                        <td className="py-2 px-3 text-foreground">{permit?.end_time || ''}</td>
                        <td className="py-2 px-3 text-foreground">{permit?.reason || ''}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                            {permit?.status || 'pendiente'}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <Button
                            onClick={() => handleDeleteClick(permit)}
                            className="px-2 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-muted/30 border border-border rounded-lg p-4 text-sm text-muted-foreground">
                No hay permisos previos.
              </div>
            )}
          </div>

      </main>
    </div>
  );
};

export default WorkPermits;
