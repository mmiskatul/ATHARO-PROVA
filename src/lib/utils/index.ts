import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";
import type { AppLocale } from "@/lib/constants/locales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: AppLocale = "en") {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  locale: AppLocale = "en",
  pattern = "dd MMM yyyy",
) {
  return format(new Date(date), pattern, {
    locale: undefined,
  }).replace(
    /\d/g,
    locale === "bn"
      ? (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
      : (digit) => digit,
  );
}

export function makeSlug(value: string) {
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function partializeName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "Donor";
  if (trimmed.length <= 2) return `${trimmed[0]}*`;

  const parts = trimmed.split(/\s+/);
  return parts
    .map((part, index) => {
      if (index === 0) {
        return `${part[0]}${"*".repeat(Math.max(part.length - 1, 1))}`;
      }

      return part[0];
    })
    .join(" ");
}

export function parseObjectId(id: string) {
  return id.trim();
}

export function absoluteUrl(pathname: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";
  return new URL(pathname, baseUrl).toString();
}
