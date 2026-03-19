import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const campaignSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    summary: { type: String, required: true, trim: true },
    summaryBn: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    descriptionBn: { type: String, required: true },
    goalAmount: { type: Number, required: true, min: 1 },
    raisedAmount: { type: Number, default: 0, min: 0 },
    coverImage: { type: String, required: true, trim: true },
    gallery: [{ type: String, trim: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    location: { type: String, required: true, trim: true },
    locationBn: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "active", "completed", "archived"],
      default: "draft",
    },
    featured: { type: Boolean, default: false },
    verificationBadge: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

campaignSchema.index({ slug: 1 }, { unique: true });
campaignSchema.index({ status: 1, featured: 1 });

export type CampaignDocument = InferSchemaType<typeof campaignSchema> & {
  _id: Types.ObjectId;
};

export const Campaign = models.Campaign || model("Campaign", campaignSchema);
