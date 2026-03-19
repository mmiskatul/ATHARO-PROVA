import { z } from "zod";
import { paymentMethodCodes } from "@/lib/constants/payments";

export const siteSettingSchema = z.object({
  siteName: z.string().min(2),
  siteNameBn: z.string().min(2),
  logo: z.string().optional().or(z.literal("")),
  favicon: z.string().optional().or(z.literal("")),
  contactEmail: z.email(),
  contactPhone: z.string().min(7),
  address: z.string().min(5),
  addressBn: z.string().min(5),
  defaultLocale: z.enum(["en", "bn"]).default("en"),
  currency: z.string().default("BDT"),
  guestDonationEnabled: z.coerce.boolean().default(true),
  paymentInstructions: z.array(
    z.object({
      code: z.enum(paymentMethodCodes),
      label: z.string().min(1),
      labelBn: z.string().min(1),
      accountNumber: z.string().min(1),
      accountName: z.string().min(1),
      instructions: z.string().min(5),
      instructionsBn: z.string().min(5),
      active: z.coerce.boolean().default(true),
    }),
  ),
  homepageContent: z.object({
    heroTitle: z.string().min(5),
    heroTitleBn: z.string().min(5),
    heroSubtitle: z.string().min(10),
    heroSubtitleBn: z.string().min(10),
    missionTitle: z.string().min(3),
    missionTitleBn: z.string().min(3),
    missionBody: z.string().min(10),
    missionBodyBn: z.string().min(10),
  }),
});
