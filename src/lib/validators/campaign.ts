import { z } from "zod";

export const campaignSchema = z.object({
  title: z.string().min(3).max(160),
  titleBn: z.string().min(3).max(160),
  slug: z.string().min(3).max(180),
  summary: z.string().min(10).max(240),
  summaryBn: z.string().min(10).max(240),
  description: z.string().min(30),
  descriptionBn: z.string().min(30),
  goalAmount: z.coerce.number().min(100),
  coverImage: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  category: z.string().min(1),
  location: z.string().min(2),
  locationBn: z.string().min(2),
  status: z.enum(["draft", "active", "completed", "archived"]).default("draft"),
  featured: z.coerce.boolean().default(false),
  verificationBadge: z.coerce.boolean().default(false),
  startDate: z.string(),
  endDate: z.string().optional().or(z.literal("")),
});
