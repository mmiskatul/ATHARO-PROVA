import type { AppLocale } from "@/lib/constants/locales";

export function pickLocalizedValue<T extends Record<string, unknown>>(
  locale: AppLocale,
  values: { en: T[keyof T]; bn: T[keyof T] },
) {
  return locale === "bn" ? values.bn : values.en;
}
