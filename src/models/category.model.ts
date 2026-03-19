import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["campaign", "post"], required: true },
    description: { type: String, trim: true },
    descriptionBn: { type: String, trim: true },
  },
  { timestamps: true },
);

export type CategoryDocument = InferSchemaType<typeof categorySchema> & {
  _id: Types.ObjectId;
};

export const Category = models.Category || model("Category", categorySchema);
