import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Logo } from "@/components/shared/logo";
import { getCurrentSession } from "@/lib/auth/session";
import { signOutAction } from "@/server/actions/auth.actions";

export async function SiteHeader() {
  const locale = (await getLocale()) as "en" | "bn";
  const t = await getTranslations("nav");
  const session = await getCurrentSession();

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/campaigns", label: t("campaigns") },
    { href: "/impact", label: t("impact") },
    { href: "/news", label: t("news") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="content-grid flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo locale={locale} />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          {session?.user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href={session.user.role === "admin" || session.user.role === "super_admin" ? "/admin" : "/dashboard"}>
                  {session.user.role === "admin" || session.user.role === "super_admin"
                    ? t("admin")
                    : t("dashboard")}
                </Link>
              </Button>
              <form action={signOutAction}>
                <Button size="sm" variant="secondary" type="submit">
                  {t("logout")}
                </Button>
              </form>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">{t("login")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
