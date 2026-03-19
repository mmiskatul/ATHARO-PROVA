export const roles = [
  "guest",
  "user",
  "moderator",
  "admin",
  "super_admin",
] as const;

export type Role = (typeof roles)[number];

export const roleHierarchy: Role[] = [
  "guest",
  "user",
  "moderator",
  "admin",
  "super_admin",
];
