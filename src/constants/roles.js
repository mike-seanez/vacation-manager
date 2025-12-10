export const Roles = Object.freeze({
  ADMINISTRATOR: 'administrator',
  HUMAN_RESOURCES: 'human_resources',
  EMPLOYEE: 'employee',
});

export const RoleIdMap = Object.freeze({
  1: Roles.ADMINISTRATOR,
  2: Roles.HUMAN_RESOURCES,
  3: Roles.EMPLOYEE,
});

export const RoleAliases = Object.freeze({
  admin: Roles.ADMINISTRATOR,
  administrator: Roles.ADMINISTRATOR,
  hr: Roles.HUMAN_RESOURCES,
  rh: Roles.HUMAN_RESOURCES,
  human_resources: Roles.HUMAN_RESOURCES,
  empleado: Roles.EMPLOYEE,
  employee: Roles.EMPLOYEE,
});

export const roleLabelEs = Object.freeze({
  [Roles.ADMINISTRATOR]: 'Administrador',
  [Roles.HUMAN_RESOURCES]: 'Recursos Humanos',
  [Roles.EMPLOYEE]: 'Empleado',
});

export function toCanonicalRole(roleOrId) {
  if (roleOrId == null) return undefined;
  if (typeof roleOrId === 'number') return RoleIdMap[roleOrId];

  if (typeof roleOrId === 'string') {
    const key = roleOrId.toLowerCase();
    return RoleAliases[key] || roleOrId;
  }

  if (typeof roleOrId === 'object') {
    const id = roleOrId.role_id ?? roleOrId.roleId ?? roleOrId.id;
    if (typeof id === 'number') return RoleIdMap[id];

    const name = roleOrId.role_name ?? roleOrId.roleName ?? roleOrId.name ?? roleOrId.role;
    if (name != null) {
      const key = String(name).toLowerCase();
      return RoleAliases[key] || name;
    }
    return undefined;
  }

  return undefined;
}
