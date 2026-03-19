import { connectToDatabase } from "@/lib/db/mongoose";
import { PaymentMethod, SiteSetting } from "@/models";
import { siteConfig } from "@/config/site";
import type { PaymentInstruction } from "@/types";

const defaultPaymentInstructions: PaymentInstruction[] = [
  {
    code: "bkash",
    label: "bKash",
    labelBn: "বিকাশ",
    accountNumber: "01700000000",
    accountName: "ATHARO PROVA",
    instructions: "Send money to the bKash merchant number and upload your screenshot.",
    instructionsBn: "বিকাশ মার্চেন্ট নম্বরে টাকা পাঠিয়ে স্ক্রিনশট আপলোড করুন।",
    active: true,
  },
  {
    code: "nagad",
    label: "Nagad",
    labelBn: "নগদ",
    accountNumber: "01800000000",
    accountName: "ATHARO PROVA",
    instructions: "Use the Nagad personal number and enter your transaction ID below.",
    instructionsBn: "নগদ নম্বরে পেমেন্ট করে ট্রানজ্যাকশন আইডি দিন।",
    active: true,
  },
  {
    code: "rocket",
    label: "Rocket",
    labelBn: "রকেট",
    accountNumber: "01900000000",
    accountName: "ATHARO PROVA",
    instructions: "Transfer to Rocket and keep the payment reference for verification.",
    instructionsBn: "রকেটে ট্রান্সফার করে ভেরিফিকেশনের জন্য রেফারেন্স সংরক্ষণ করুন।",
    active: true,
  },
  {
    code: "bank_transfer",
    label: "Bank Transfer",
    labelBn: "ব্যাংক ট্রান্সফার",
    accountNumber: "1234567890",
    accountName: "ATHARO PROVA TRUST ACCOUNT",
    instructions: "Use the provided bank details and upload your deposit slip or online receipt.",
    instructionsBn: "প্রদত্ত ব্যাংক তথ্য ব্যবহার করে রিসিপ্ট বা ডিপোজিট স্লিপ আপলোড করুন।",
    active: true,
  },
];

export const SettingsService = {
  async ensureSettings() {
    await connectToDatabase();

    const existing = await SiteSetting.findOne();
    if (existing) return existing;

    await PaymentMethod.insertMany(
      defaultPaymentInstructions.map((instruction, index) => ({
        ...instruction,
        name: instruction.label,
        nameBn: instruction.labelBn,
        sortOrder: index,
      })),
      { ordered: false },
    ).catch(() => undefined);

    return SiteSetting.create({
      siteName: siteConfig.name,
      siteNameBn: siteConfig.nameBn,
      contactEmail: siteConfig.contact.email,
      contactPhone: siteConfig.contact.phone,
      address: "Village office, Bangladesh",
      addressBn: "গ্রাম অফিস, বাংলাদেশ",
      socialLinks: siteConfig.socialLinks,
      supportedLocales: ["en", "bn"],
      defaultLocale: "en",
      currency: "BDT",
      guestDonationEnabled: true,
      paymentInstructions: defaultPaymentInstructions,
      homepageContent: {
        heroTitle: "Students organizing verified generosity for local communities.",
        heroTitleBn: "শিক্ষার্থীদের উদ্যোগে স্থানীয় মানুষের জন্য যাচাইকৃত সহায়তা।",
        heroSubtitle:
          "Start in the village, scale across Bangladesh, and keep every donation transparent.",
        heroSubtitleBn:
          "গ্রাম থেকে শুরু করে বাংলাদেশজুড়ে স্বচ্ছ সহায়তা পৌঁছে দেওয়ার প্ল্যাটফর্ম।",
        missionTitle: "Trust, transparency, and student leadership",
        missionTitleBn: "বিশ্বাস, স্বচ্ছতা এবং শিক্ষার্থীদের নেতৃত্ব",
        missionBody:
          "ATHARO PROVA verifies manual payments and shows only approved donations in public impact totals.",
        missionBodyBn:
          "আঠারো প্রভা ম্যানুয়াল পেমেন্ট যাচাই করে এবং শুধু অনুমোদিত ডোনেশনই পাবলিক টোটালে দেখায়।",
      },
    });
  },
};
