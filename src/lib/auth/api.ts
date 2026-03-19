import { auth } from "@/auth";
import { hasRole } from "@/lib/permissions";
import type { Role } from "@/lib/constants/roles";

export async function requireApiRole(role: Role) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!hasRole(session.user.role, role)) {
    throw new Error("Forbidden");
  }

  return session.user;
}

export async function getApiUser() {
  const session = await auth();
  return session?.user ?? null;
}
