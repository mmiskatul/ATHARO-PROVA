import { z } from "zod";
import { paymentMethodCodes, publicNameModes } from "@/lib/constants/payments";

export const donationSchema = z.object({
  campaignId: z.string().optional().nullable(),
  donorName: z.string().min(2).max(120),
  donorEmail: z.email(),
  donorPhone: z.string().min(10).max(20).optional().or(z.literal("")),
  amount: z.coerce.number().min(10),
  publicNameMode: z.enum(publicNameModes),
  paymentMethod: z.enum(paymentMethodCodes),
  transactionId: z.string().min(4).max(100),
  paymentProofUrl: z.string().min(1),
  donorMessage: z.string().max(280).optional().or(z.literal("")),
});

export const donationReviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  note: z.string().max(500).optional(),
});
