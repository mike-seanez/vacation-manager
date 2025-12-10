import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const HolidayList = ({
  holidays,
  selectedYear,
  onEditHoliday,
  onDeleteHoliday,
}) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    date.setDate(new Date(dateStr).getDate() + 1);
    return date?.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const sortedHolidays = [...holidays]?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const groupedHolidays = sortedHolidays?.reduce((groups, holiday) => {
    const month = new Date(holiday.date)?.toLocaleDateString("es-MX", {
      month: "long",
    });
    if (!groups?.[month]) {
      groups[month] = [];
    }
    groups?.[month]?.push(holiday);
    return groups;
  }, {});

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Días Festivos {selectedYear}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {holidays?.length} días
            </span>
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {Object.keys(groupedHolidays)?.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Calendar"
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />
            <p className="text-muted-foreground">
              No hay días festivos definidos para {selectedYear}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Haz clic en cualquier fecha del calendario para agregar un día
              festivo
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedHolidays)?.map(([month, monthHolidays]) => (
              <div key={month}>
                <h4 className="text-sm font-semibold text-foreground mb-3 capitalize">
                  {month}
                </h4>
                <div className="space-y-2">
                  {monthHolidays?.map((holiday) => (
                    <div
                      key={holiday?.id}
                      className={`p-3 rounded-lg border transition-smooth hover:shadow-sm bg-red-50 border-red-200`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon
                              name="Lock"
                              size={14}
                              className="text-red-600"
                            />
                            <h5 className="text-sm font-medium text-foreground truncate">
                              {holiday?.description}
                            </h5>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {formatDate(holiday?.date)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditHoliday(holiday)}
                            iconName="Edit2"
                            iconSize={14}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteHoliday(holiday)}
                            iconName="Trash2"
                            iconSize={14}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayList;
