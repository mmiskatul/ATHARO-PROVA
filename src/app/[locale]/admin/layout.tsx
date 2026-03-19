import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { requireRole } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole("admin");

  const items = [
    { href: "", label: "Overview" },
    { href: "/users", label: "Users" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/donations", label: "Donations" },
    { href: "/payment-verification", label: "Payment Verification" },
    { href: "/posts", label: "Posts" },
    { href: "/faq", label: "FAQ" },
    { href: "/pages", label: "Pages" },
    { href: "/homepage-content", label: "Homepage Content" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/settings", label: "Settings" },
    { href: "/analytics", label: "Analytics" },
    { href: "/audit-logs", label: "Audit Logs" },
  ];

  return (
    <div className="content-grid py-10">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar basePath="/admin" items={items} />
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
