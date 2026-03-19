import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuth();
  const items = [
    { href: "", label: "Overview" },
    { href: "/profile", label: "Profile" },
    { href: "/donations", label: "Donations" },
    { href: "/receipts", label: "Receipts" },
    { href: "/saved", label: "Saved Campaigns" },
    { href: "/notifications", label: "Notifications" },
  ];

  return (
    <div className="content-grid py-10">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar basePath="/dashboard" items={items} />
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-border bg-white p-6">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <h1 className="text-2xl font-bold">{user.name}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
