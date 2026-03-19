import { connectToDatabase } from "@/lib/db/mongoose";
import { Campaign } from "@/models";

export const CampaignRepository = {
  async listPublic() {
    await connectToDatabase();
    return Campaign.find({ status: "active" })
      .populate("category")
      .sort({ featured: -1, createdAt: -1 });
  },

  async listAdmin() {
    await connectToDatabase();
    return Campaign.find().populate("category").sort({ createdAt: -1 });
  },

  async getBySlug(slug: string) {
    await connectToDatabase();
    return Campaign.findOne({ slug }).populate("category").populate("createdBy");
  },

  async getById(id: string) {
    await connectToDatabase();
    return Campaign.findById(id).populate("category");
  },

  async create(data: Record<string, unknown>) {
    await connectToDatabase();
    return Campaign.create(data);
  },

  async update(id: string, data: Record<string, unknown>) {
    await connectToDatabase();
    return Campaign.findByIdAndUpdate(id, data, { new: true });
  },
};
