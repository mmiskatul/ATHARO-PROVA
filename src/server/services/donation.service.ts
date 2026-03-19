import { randomUUID } from "node:crypto";
import { Types } from "mongoose";
import {
  donationSchema,
  donationReviewSchema,
} from "@/lib/validators/donation";
import { partializeName } from "@/lib/utils";
import { Campaign, Donation, Notification, PaymentMethod, PaymentProof, Receipt } from "@/models";
import { DonationRepository } from "@/server/repositories/donation.repository";
import { SettingsService } from "@/server/services/settings.service";

function getPublicDisplayName(name: string, mode: "full" | "partial" | "anonymous") {
  if (mode === "anonymous") return "Anonymous Donor";
  if (mode === "partial") return partializeName(name);
  return name;
}

export const DonationService = {
  async createDonation(input: unknown, userId?: string) {
    const payload = donationSchema.parse(input);
    const settings = await SettingsService.ensureSettings();

    if (!settings.guestDonationEnabled && !userId) {
      throw new Error("Guest donations are currently disabled.");
    }

    const paymentMethod = await PaymentMethod.findOne({
      code: payload.paymentMethod,
      active: true,
    });

    if (!paymentMethod) {
      throw new Error("Selected payment method is unavailable.");
    }

    const donation = await DonationRepository.create({
      userId: userId ? new Types.ObjectId(userId) : null,
      campaignId: payload.campaignId ? new Types.ObjectId(payload.campaignId) : null,
      donorName: payload.donorName,
      donorEmail: payload.donorEmail,
      donorPhone: payload.donorPhone || undefined,
      amount: payload.amount,
      currency: "BDT",
      isAnonymous: payload.publicNameMode === "anonymous",
      publicNameMode: payload.publicNameMode,
      publicDisplayName: getPublicDisplayName(payload.donorName, payload.publicNameMode),
      paymentMethod: payload.paymentMethod,
      transactionId: payload.transactionId,
      paymentProofUrl: payload.paymentProofUrl,
      donorMessage: payload.donorMessage || undefined,
      status: "pending",
    });

    await PaymentProof.create({
      donationId: donation._id,
      url: payload.paymentProofUrl,
      mimeType: "image/jpeg",
      size: 0,
      uploadedBy: userId ? new Types.ObjectId(userId) : null,
    });

    return donation;
  },

  async reviewDonation(donationId: string, reviewerId: string, input: unknown) {
    const payload = donationReviewSchema.parse(input);
    const donation = await DonationRepository.getById(donationId);
    if (!donation) {
      throw new Error("Donation not found.");
    }

    const reviewed = await DonationRepository.review(donationId, {
      status: payload.status,
      verifiedBy: new Types.ObjectId(reviewerId),
      verifiedAt: new Date(),
    });

    if (payload.status === "approved") {
      const receipt = await Receipt.create({
        donationId: donation._id,
        receiptNumber: `APR-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        issuedTo: donation.donorName,
        amount: donation.amount,
        currency: donation.currency,
      });

      await Donation.findByIdAndUpdate(donation._id, { receiptId: receipt._id });
    }

    if (donation.campaignId) {
      await this.syncCampaignTotals(donation.campaignId.toString());
    }

    if (donation.userId) {
      await Notification.create({
        userId: donation.userId,
        title: payload.status === "approved" ? "Donation approved" : "Donation rejected",
        titleBn:
          payload.status === "approved"
            ? "ডোনেশন অনুমোদিত হয়েছে"
            : "ডোনেশন প্রত্যাখ্যাত হয়েছে",
        message:
          payload.status === "approved"
            ? "Your donation has been verified and added to public totals."
            : "Your donation was reviewed and was not approved.",
        messageBn:
          payload.status === "approved"
            ? "আপনার ডোনেশন যাচাই হয়ে পাবলিক টোটালে যুক্ত হয়েছে।"
            : "আপনার ডোনেশন রিভিউ করা হয়েছে কিন্তু অনুমোদিত হয়নি।",
        type: "donation",
        href: "/dashboard/donations",
      });
    }

    return reviewed;
  },

  async syncCampaignTotals(campaignId: string) {
    const approvedTotal = await Donation.aggregate<{ total: number }>([
      {
        $match: {
          campaignId: new Types.ObjectId(campaignId),
          status: "approved",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    await Campaign.findByIdAndUpdate(campaignId, {
      raisedAmount: approvedTotal[0]?.total ?? 0,
    });
  },
};
