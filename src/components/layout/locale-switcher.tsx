"use client";

import type { Route } from "next";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AppLocale } from "@/lib/constants/locales";

export function LocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Toggle locale
  const nextLocale: AppLocale = locale === "en" ? "bn" : "en";
  const nextLabel = nextLocale === "en" ? "English" : "বাংলা";

  const buildLocalizedPath = (targetLocale: AppLocale): Route => {
    let nextPathname = pathname;

    if (pathname === "/") {
      nextPathname = `/${targetLocale}`;
    } else if (/^\/(en|bn)(\/|$)/.test(pathname)) {
      nextPathname = pathname.replace(/^\/(en|bn)(?=\/|$)/, `/${targetLocale}`);
    } else {
      nextPathname = `/${targetLocale}${pathname}`;
    }

    const query = searchParams.toString();
    return (query ? `${nextPathname}?${query}` : nextPathname) as Route;
  };

  return (
    <button
      type="button"
      aria-label="Language switcher"
      onClick={() => {
        if (isPending) return;

        startTransition(() => {
          router.replace(buildLocalizedPath(nextLocale));
        });
      }}
      className="rounded-full border border-border bg-muted/70 px-4 py-1.5 text-xs font-semibold text-foreground transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-70"
      disabled={isPending}
    >
      <span className={nextLocale === "bn" ? "bangla" : undefined}>
        {nextLabel}
      </span>
    </button>
  );
}
