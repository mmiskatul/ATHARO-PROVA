import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { AppLocale } from "@/lib/constants/locales";
import type { Role } from "@/lib/constants/roles";
import { loginSchema } from "@/lib/validators/auth";
import { UserRepository } from "@/server/repositories/user.repository";

export const authConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/en/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = loginSchema.safeParse(credentials);
        if (!payload.success) {
          return null;
        }

        const user = await UserRepository.findCredentialsUserByEmail(payload.data.email);
        if (!user || !user.isActive) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          payload.data.password,
          user.passwordHash,
        );

        if (!passwordMatches) {
          return null;
        }

        user.lastLoginAt = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          preferredLanguage: user.preferredLanguage,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.preferredLanguage = user.preferredLanguage;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.role = token.role as Role;
        session.user.preferredLanguage = token.preferredLanguage as AppLocale;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
