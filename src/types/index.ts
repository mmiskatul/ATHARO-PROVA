import type { Role } from "@/lib/constants/roles";
import type {
  DonationStatus,
  PaymentMethodCode,
  PublicNameMode,
} from "@/lib/constants/payments";
import type { AppLocale } from "@/lib/constants/locales";

export type LocalizedText = {
  en: string;
  bn: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  preferredLanguage: AppLocale;
  image?: string | null;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type DonationFeedItem = {
  id: string;
  publicDisplayName: string;
  amount: number;
  donorMessage?: string;
  createdAt: string;
  campaignTitle?: string;
  publicNameMode: PublicNameMode;
  status: DonationStatus;
};

export type PaymentInstruction = {
  code: PaymentMethodCode;
  label: string;
  labelBn: string;
  accountNumber: string;
  accountName: string;
  instructions: string;
  instructionsBn: string;
  active: boolean;
};
