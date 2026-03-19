import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";
import { locales } from "@/lib/constants/locales";
import { roles } from "@/lib/constants/roles";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    avatar: { type: String, trim: true },
    role: { type: String, enum: roles, default: "user" },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    preferredLanguage: { type: String, enum: locales, default: "en" },
    savedCampaignIds: [{ type: Schema.Types.ObjectId, ref: "Campaign", default: [] }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    lastLoginAt: { type: Date },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId };

export const User = models.User || model("User", userSchema);
