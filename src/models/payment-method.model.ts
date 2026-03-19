import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";
import { paymentMethodCodes } from "@/lib/constants/payments";

const paymentMethodSchema = new Schema(
  {
    code: { type: String, enum: paymentMethodCodes, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    accountName: { type: String, required: true, trim: true },
    instructions: { type: String, required: true },
    instructionsBn: { type: String, required: true },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type PaymentMethodDocument = InferSchemaType<typeof paymentMethodSchema> & {
  _id: Types.ObjectId;
};

export const PaymentMethod =
  models.PaymentMethod || model("PaymentMethod", paymentMethodSchema);
