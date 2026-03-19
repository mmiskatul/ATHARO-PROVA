import type { Role } from "@/lib/constants/roles";
import { roleHierarchy } from "@/lib/constants/roles";

export function hasRole(currentRole: Role, minimumRole: Role) {
  return roleHierarchy.indexOf(currentRole) >= roleHierarchy.indexOf(minimumRole);
}

export function isAdminRole(role: Role) {
  return hasRole(role, "admin");
}

export function canModerate(role: Role) {
  return hasRole(role, "moderator");
}
