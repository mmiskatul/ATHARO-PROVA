import type { DefaultSession } from "next-auth";
import type { Role } from "@/lib/constants/roles";
import type { AppLocale } from "@/lib/constants/locales";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
      preferredLanguage: AppLocale;
    };
  }

  interface User {
    id: string;
    role: Role;
    preferredLanguage: AppLocale;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    preferredLanguage: AppLocale;
  }
}
