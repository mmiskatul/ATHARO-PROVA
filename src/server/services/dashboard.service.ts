import { connectToDatabase } from "@/lib/db/mongoose";
import { Donation, Notification, Receipt, User } from "@/models";

export const DashboardService = {
  async getUserDashboard(userId: string) {
    await connectToDatabase();

    const [user, donations, receipts, notifications] = await Promise.all([
      User.findById(userId).populate("savedCampaignIds"),
      Donation.find({ userId }).populate("campaignId").sort({ createdAt: -1 }),
      Receipt.find({}).sort({ createdAt: -1 }),
      Notification.find({ userId }).sort({ createdAt: -1 }),
    ]);

    return {
      user,
      donations,
      receipts: receipts.filter((receipt) =>
        donations.some((donation) => donation.receiptId?.toString() === receipt._id.toString()),
      ),
      notifications,
    };
  },
};
