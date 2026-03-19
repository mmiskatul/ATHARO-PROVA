import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { hasRole } from "@/lib/permissions";
import type { Role } from "@/lib/constants/roles";

export async function getCurrentSession() {
  return auth();
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/en/login");
  }

  return session.user;
}

export async function requireRole(role: Role) {
  const user = await requireAuth();

  if (!hasRole(user.role, role)) {
    redirect("/en");
  }

  return user;
}
