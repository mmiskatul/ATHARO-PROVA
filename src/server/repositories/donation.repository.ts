import { connectToDatabase } from "@/lib/db/mongoose";
import { Donation } from "@/models";

export const DonationRepository = {
  async create(data: Record<string, unknown>) {
    await connectToDatabase();
    return Donation.create(data);
  },

  async getById(id: string) {
    await connectToDatabase();
    return Donation.findById(id).populate("campaignId").populate("userId");
  },

  async listApprovedFeed(limit = 10) {
    await connectToDatabase();
    return Donation.find({ status: "approved" })
      .populate("campaignId")
      .sort({ createdAt: -1 })
      .limit(limit);
  },

  async listForUser(userId: string) {
    await connectToDatabase();
    return Donation.find({ userId }).populate("campaignId").sort({ createdAt: -1 });
  },

  async listForAdmin() {
    await connectToDatabase();
    return Donation.find()
      .populate("campaignId")
      .populate("userId")
      .populate("verifiedBy")
      .sort({ createdAt: -1 });
  },

  async review(id: string, data: Record<string, unknown>) {
    await connectToDatabase();
    return Donation.findByIdAndUpdate(id, data, { new: true });
  },

  async aggregateApprovedAmount(campaignId?: string | null) {
    await connectToDatabase();
    const pipeline = [
      { $match: { status: "approved", ...(campaignId ? { campaignId } : {}) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ];
    const result = await Donation.aggregate<{ total: number }>(pipeline);
    return result[0]?.total ?? 0;
  },
};
