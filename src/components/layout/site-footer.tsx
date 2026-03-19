import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/logo";

export async function SiteFooter() {
  const locale = (await getLocale()) as "en" | "bn";
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border/70 bg-[#fff8ef] py-12">
      <div className="content-grid grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo locale={locale} />
          <p className="max-w-md text-sm leading-6 text-muted-foreground">{t("tagline")}</p>
          <p className="text-sm text-muted-foreground">{siteConfig.contact.email}</p>
          <p className="text-sm text-muted-foreground">{siteConfig.contact.phone}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
            Explore
          </h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link href="/campaigns">Campaigns</Link>
            <Link href="/news">News</Link>
            <Link href="/impact">Impact</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
            Legal
          </h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
