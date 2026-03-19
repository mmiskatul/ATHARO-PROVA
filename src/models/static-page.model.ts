import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const staticPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    excerpt: { type: String, trim: true },
    excerptBn: { type: String, trim: true },
    content: { type: String, required: true },
    contentBn: { type: String, required: true },
    published: { type: Boolean, default: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export type StaticPageDocument = InferSchemaType<typeof staticPageSchema> & {
  _id: Types.ObjectId;
};

export const StaticPage =
  models.StaticPage || model("StaticPage", staticPageSchema);
