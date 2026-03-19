import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const paymentProofSchema = new Schema(
  {
    donationId: { type: Schema.Types.ObjectId, ref: "Donation", required: true },
    url: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 1 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true },
);

export type PaymentProofDocument = InferSchemaType<typeof paymentProofSchema> & {
  _id: Types.ObjectId;
};

export const PaymentProof = models.PaymentProof || model("PaymentProof", paymentProofSchema);
