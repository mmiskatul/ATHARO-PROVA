export const locales = ["en", "bn"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";
