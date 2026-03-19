import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { absoluteUrl } from "@/lib/utils";
import { registerSchema } from "@/lib/validators/auth";
import { User } from "@/models";
import { UserRepository } from "@/server/repositories/user.repository";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/emails";

export const AuthService = {
  async register(input: unknown) {
    const payload = registerSchema.parse(input);
    const existing = await UserRepository.findByEmail(payload.email);
    if (existing) {
      throw new Error("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const verificationToken = crypto.randomBytes(24).toString("hex");
    const user = await UserRepository.create({
      name: payload.name,
      email: payload.email,
      passwordHash,
      phone: payload.phone || undefined,
      preferredLanguage: payload.preferredLanguage,
    });

    await User.findByIdAndUpdate(user._id, {
      emailVerificationToken: verificationToken,
      emailVerificationExpires: new Date(Date.now() + 1000 * 60 * 60 * 48),
    });

    await sendVerificationEmail({
      email: payload.email,
      name: payload.name,
      verificationUrl: absoluteUrl(`/api/auth/verify-email?token=${verificationToken}`),
    });

    return user;
  },

  async requestPasswordReset(email: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const token = crypto.randomBytes(24).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    await sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      resetUrl: absoluteUrl(`/en/reset-password/${token}`),
    });

    return token;
  },

  async resetPassword(token: string, password: string) {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gte: new Date() },
    }).select("+passwordHash");

    if (!user) {
      throw new Error("This password reset link is invalid or has expired.");
    }

    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
  },

  async verifyEmail(token: string) {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gte: new Date() },
    });

    if (!user) {
      throw new Error("Verification token is invalid or expired.");
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    return user;
  },
};
