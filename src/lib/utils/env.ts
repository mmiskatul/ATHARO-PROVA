import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().min(1).default("mongodb://localhost:27017/atharo-prova"),
  AUTH_SECRET: z
    .string()
    .min(32)
    .default("development-auth-secret-change-me-32"),
  AUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  DEFAULT_LOCALE: z.enum(["en", "bn"]).default("en"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  STORAGE_DRIVER: z.enum(["local", "cloudinary", "s3"]).default("local"),
  STORAGE_PUBLIC_BASE_URL: z.string().optional(),
  UPLOAD_DIR: z.string().default("public/uploads"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_URL: process.env.AUTH_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
  STORAGE_DRIVER: process.env.STORAGE_DRIVER,
  STORAGE_PUBLIC_BASE_URL: process.env.STORAGE_PUBLIC_BASE_URL,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
});
