import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    questionBn: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    answerBn: { type: String, required: true },
    category: { type: String, trim: true, default: "general" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type FAQDocument = InferSchemaType<typeof faqSchema> & { _id: Types.ObjectId };

export const FAQ = models.FAQ || model("FAQ", faqSchema);
