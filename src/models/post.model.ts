import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    excerptBn: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    contentBn: { type: String, required: true },
    coverImage: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

postSchema.index({ slug: 1 }, { unique: true });

export type PostDocument = InferSchemaType<typeof postSchema> & { _id: Types.ObjectId };

export const Post = models.Post || model("Post", postSchema);
