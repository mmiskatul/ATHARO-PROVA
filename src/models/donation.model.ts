import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";
import { donationStatuses, paymentMethodCodes, publicNameModes } from "@/lib/constants/payments";

const donationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", default: null },
    donorName: { type: String, required: true, trim: true },
    donorEmail: { type: String, required: true, trim: true, lowercase: true },
    donorPhone: { type: String, trim: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "BDT" },
    isAnonymous: { type: Boolean, default: false },
    publicNameMode: { type: String, enum: publicNameModes, default: "full" },
    publicDisplayName: { type: String, required: true, trim: true },
    paymentMethod: { type: String, enum: paymentMethodCodes, required: true },
    transactionId: { type: String, required: true, trim: true },
    paymentProofUrl: { type: String, trim: true },
    status: { type: String, enum: donationStatuses, default: "pending" },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date },
    donorMessage: { type: String, trim: true },
    receiptId: { type: Schema.Types.ObjectId, ref: "Receipt" },
  },
  { timestamps: true },
);

donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ campaignId: 1, status: 1 });

export type DonationDocument = InferSchemaType<typeof donationSchema> & {
  _id: Types.ObjectId;
};

export const Donation = models.Donation || model("Donation", donationSchema);
