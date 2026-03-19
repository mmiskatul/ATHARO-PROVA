import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3),
  titleBn: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10).max(240),
  excerptBn: z.string().min(10).max(240),
  content: z.string().min(30),
  contentBn: z.string().min(30),
  coverImage: z.string().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  published: z.coerce.boolean().default(false),
  category: z.string().optional().or(z.literal("")),
});

export const faqSchema = z.object({
  question: z.string().min(5),
  questionBn: z.string().min(5),
  answer: z.string().min(10),
  answerBn: z.string().min(10),
  category: z.string().default("general"),
  order: z.coerce.number().default(0),
  published: z.coerce.boolean().default(true),
});

export const staticPageSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(3),
  titleBn: z.string().min(3),
  excerpt: z.string().optional().or(z.literal("")),
  excerptBn: z.string().optional().or(z.literal("")),
  content: z.string().min(30),
  contentBn: z.string().min(30),
  published: z.coerce.boolean().default(true),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  roleBn: z.string().min(2),
  quote: z.string().min(10),
  quoteBn: z.string().min(10),
  avatar: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  locationBn: z.string().optional().or(z.literal("")),
  featured: z.coerce.boolean().default(true),
  published: z.coerce.boolean().default(true),
});
