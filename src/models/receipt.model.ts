import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const receiptSchema = new Schema(
  {
    donationId: { type: Schema.Types.ObjectId, ref: "Donation", required: true, unique: true },
    receiptNumber: { type: String, required: true, unique: true },
    issuedTo: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "BDT" },
    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export type ReceiptDocument = InferSchemaType<typeof receiptSchema> & { _id: Types.ObjectId };

export const Receipt = models.Receipt || model("Receipt", receiptSchema);
