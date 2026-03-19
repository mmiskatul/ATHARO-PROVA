import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const campaignUpdateSchema = new Schema(
  {
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: true },
    title: { type: String, required: true, trim: true },
    titleBn: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    contentBn: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export type CampaignUpdateDocument = InferSchemaType<typeof campaignUpdateSchema> & {
  _id: Types.ObjectId;
};

export const CampaignUpdate =
  models.CampaignUpdate || model("CampaignUpdate", campaignUpdateSchema);
