import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "resolved"], default: "new" },
  },
  { timestamps: true },
);

export type ContactMessageDocument = InferSchemaType<typeof contactMessageSchema> & {
  _id: Types.ObjectId;
};

export const ContactMessage =
  models.ContactMessage || model("ContactMessage", contactMessageSchema);
