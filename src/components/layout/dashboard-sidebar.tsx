import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export async function DashboardSidebar({
  basePath,
  items,
}: {
  basePath: "/dashboard" | "/admin";
  items: { href: string; label: string }[];
}) {
  const locale = (await getLocale()) as "en" | "bn";

  return (
    <aside className="rounded-[2rem] border border-sidebar-border bg-sidebar p-6">
      <Logo locale={locale} />
      <nav className="mt-8 grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={`${basePath}${item.href}`}
            className={cn(
              "rounded-2xl px-4 py-3 text-sm font-medium text-sidebar-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
