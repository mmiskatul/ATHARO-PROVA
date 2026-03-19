import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";
import { locales } from "@/lib/constants/locales";
import { paymentMethodCodes } from "@/lib/constants/payments";

const paymentInstructionSchema = new Schema(
  {
    code: { type: String, enum: paymentMethodCodes, required: true },
    label: { type: String, required: true },
    labelBn: { type: String, required: true },
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    instructions: { type: String, required: true },
    instructionsBn: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { _id: false },
);

const homepageContentSchema = new Schema(
  {
    heroTitle: { type: String, required: true },
    heroTitleBn: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    heroSubtitleBn: { type: String, required: true },
    missionTitle: { type: String, required: true },
    missionTitleBn: { type: String, required: true },
    missionBody: { type: String, required: true },
    missionBodyBn: { type: String, required: true },
  },
  { _id: false },
);

const siteSettingSchema = new Schema(
  {
    siteName: { type: String, required: true },
    siteNameBn: { type: String, required: true },
    logo: { type: String, trim: true },
    favicon: { type: String, trim: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    addressBn: { type: String, required: true },
    socialLinks: { type: Schema.Types.Mixed, default: {} },
    supportedLocales: [{ type: String, enum: locales, default: "en" }],
    defaultLocale: { type: String, enum: locales, default: "en" },
    currency: { type: String, default: "BDT" },
    guestDonationEnabled: { type: Boolean, default: true },
    paymentInstructions: [paymentInstructionSchema],
    homepageContent: { type: homepageContentSchema, required: true },
  },
  { timestamps: true },
);

export type SiteSettingDocument = InferSchemaType<typeof siteSettingSchema> & {
  _id: Types.ObjectId;
};

export const SiteSetting =
  models.SiteSetting || model("SiteSetting", siteSettingSchema);
