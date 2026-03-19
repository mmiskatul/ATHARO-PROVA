import type { Metadata } from "next";

export const siteConfig = {
  name: "ATHARO PROVA",
  nameBn: "আঠারো প্রভা",
  description:
    "A bilingual donation and transparency platform helping students serve communities across Bangladesh.",
  defaultCurrency: "BDT",
  socialLinks: {
    facebook: "https://facebook.com/atharoprova",
    instagram: "https://instagram.com/atharoprova",
    youtube: "https://youtube.com/@atharoprova",
  },
  contact: {
    email: "hello@atharoprova.org",
    phone: "+8801700000000",
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://atharoprova.org"),
  title: {
    default: `${siteConfig.name} | Donation Platform`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "donation platform",
    "bangladesh charity",
    "student-led nonprofit",
    "manual donation verification",
    "atharo prova",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};
