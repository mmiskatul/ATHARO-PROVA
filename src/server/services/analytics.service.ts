import { connectToDatabase } from "@/lib/db/mongoose";
import { Campaign, Donation, User } from "@/models";

export const AnalyticsService = {
  async getOverview() {
    await connectToDatabase();

    const [totalUsers, totalCampaigns, donationsByStatus, monthlyDonations, methodBreakdown] =
      await Promise.all([
        User.countDocuments(),
        Campaign.countDocuments(),
        Donation.aggregate([
          { $group: { _id: "$status", totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } },
        ]),
        Donation.aggregate([
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              amount: {
                $sum: {
                  $cond: [{ $eq: ["$status", "approved"] }, "$amount", 0],
                },
              },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]),
        Donation.aggregate([
          {
            $group: {
              _id: "$paymentMethod",
              total: { $sum: "$amount" },
            },
          },
        ]),
      ]);

    const totals = donationsByStatus.reduce(
      (acc, item) => {
        acc[item._id] = item.totalAmount;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalUsers,
      totalCampaigns,
      totalDonations: totals.approved ?? 0,
      verifiedDonations: totals.approved ?? 0,
      pendingDonations: totals.pending ?? 0,
      rejectedDonations: totals.rejected ?? 0,
      monthlyDonations: monthlyDonations.map((item) => ({
        name: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        amount: item.amount,
      })),
      paymentMethodBreakdown: methodBreakdown.map((item) => ({
        method: item._id,
        total: item.total,
      })),
    };
  },
};
