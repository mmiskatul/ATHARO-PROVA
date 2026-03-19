export const paymentMethodCodes = [
  "bkash",
  "nagad",
  "rocket",
  "bank_transfer",
] as const;

export type PaymentMethodCode = (typeof paymentMethodCodes)[number];

export const donationStatuses = [
  "pending",
  "approved",
  "rejected",
  "refunded",
] as const;

export type DonationStatus = (typeof donationStatuses)[number];

export const publicNameModes = ["full", "partial", "anonymous"] as const;

export type PublicNameMode = (typeof publicNameModes)[number];
