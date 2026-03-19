import "dotenv/config";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db/mongoose";
import {
  Campaign,
  Category,
  Donation,
  FAQ,
  Notification,
  PaymentMethod,
  Post,
  SiteSetting,
  StaticPage,
  Testimonial,
  User,
} from "@/models";
import { SettingsService } from "@/server/services/settings.service";
import { makeSlug, partializeName } from "@/lib/utils";

async function seed() {
  await connectToDatabase();

  await Promise.all([
    Campaign.deleteMany({}),
    Category.deleteMany({}),
    Donation.deleteMany({}),
    FAQ.deleteMany({}),
    Notification.deleteMany({}),
    PaymentMethod.deleteMany({}),
    Post.deleteMany({}),
    SiteSetting.deleteMany({}),
    StaticPage.deleteMany({}),
    Testimonial.deleteMany({}),
    User.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash("Passw0rd!2026", 12);

  const [, admin, member] = await User.create([
    {
      name: "Super Admin",
      email: "superadmin@atharoprova.org",
      passwordHash,
      role: "super_admin",
      emailVerified: true,
      preferredLanguage: "en",
    },
    {
      name: "Admin User",
      email: "admin@atharoprova.org",
      passwordHash,
      role: "admin",
      emailVerified: true,
      preferredLanguage: "en",
    },
    {
      name: "Village Student",
      email: "member@atharoprova.org",
      passwordHash,
      role: "user",
      emailVerified: true,
      preferredLanguage: "bn",
    },
  ]);

  const [campaignCategory, postCategory] = await Category.create([
    {
      name: "Emergency Relief",
      nameBn: "জরুরি সহায়তা",
      slug: "emergency-relief",
      type: "campaign",
      description: "Urgent support campaigns.",
      descriptionBn: "জরুরি সহায়তার ক্যাম্পেইন।",
    },
    {
      name: "Community Updates",
      nameBn: "কমিউনিটি আপডেট",
      slug: "community-updates",
      type: "post",
      description: "Field and community updates.",
      descriptionBn: "মাঠপর্যায়ের আপডেট।",
    },
  ]);

  await SettingsService.ensureSettings();

  const campaigns = await Campaign.create([
    {
      title: "Flood support for 50 families",
      titleBn: "৫০টি পরিবারের জন্য বন্যা সহায়তা",
      slug: makeSlug("Flood support for 50 families"),
      summary: "Help deliver food packs, medicine, and clean water.",
      summaryBn: "খাদ্য, ওষুধ ও বিশুদ্ধ পানি পৌঁছে দিতে সহায়তা করুন।",
      description: "<p>Students are coordinating relief kits and verified distribution updates.</p>",
      descriptionBn: "<p>শিক্ষার্থীরা রিলিফ কিট ও যাচাইকৃত বিতরণ আপডেট সমন্বয় করছে।</p>",
      goalAmount: 250000,
      raisedAmount: 0,
      coverImage:
        "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&w=1200&q=80",
      gallery: [],
      category: campaignCategory._id,
      location: "Sunamganj, Bangladesh",
      locationBn: "সুনামগঞ্জ, বাংলাদেশ",
      status: "active",
      featured: true,
      verificationBadge: true,
      startDate: new Date(),
      createdBy: admin._id,
    },
    {
      title: "Winter blankets for elderly residents",
      titleBn: "প্রবীণদের জন্য শীতবস্ত্র",
      slug: makeSlug("Winter blankets for elderly residents"),
      summary: "Prepare blankets and warm clothing before peak winter.",
      summaryBn: "শীতের আগে কম্বল ও গরম কাপড় প্রস্তুত করা।",
      description: "<p>This campaign supports older villagers through winter nights.</p>",
      descriptionBn: "<p>এই ক্যাম্পেইন গ্রামাঞ্চলের প্রবীণদের শীতের রাতে সহায়তা করবে।</p>",
      goalAmount: 150000,
      raisedAmount: 0,
      coverImage:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      gallery: [],
      category: campaignCategory._id,
      location: "Rajshahi, Bangladesh",
      locationBn: "রাজশাহী, বাংলাদেশ",
      status: "active",
      featured: true,
      verificationBadge: true,
      startDate: new Date(),
      createdBy: admin._id,
    },
  ]);

  await Post.create([
    {
      title: "How students organized verified relief in one week",
      titleBn: "এক সপ্তাহে শিক্ষার্থীরা কীভাবে যাচাইকৃত সহায়তা সংগঠিত করল",
      slug: makeSlug("How students organized verified relief in one week"),
      excerpt: "A short look at the systems the team used to verify manual donations.",
      excerptBn: "ম্যানুয়াল ডোনেশন যাচাইয়ের জন্য টিম যে পদ্ধতি ব্যবহার করেছে তার সংক্ষিপ্ত গল্প।",
      content: "<p>We built a manual verification queue, donor receipts, and clear audit logs.</p>",
      contentBn: "<p>আমরা ম্যানুয়াল ভেরিফিকেশন কিউ, রিসিপ্ট এবং অডিট লগ তৈরি করেছি।</p>",
      coverImage:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      tags: ["students", "transparency"],
      published: true,
      publishedAt: new Date(),
      category: postCategory._id,
      createdBy: admin._id,
      updatedBy: admin._id,
    },
    {
      title: "Transparency update from the village campaign",
      titleBn: "গ্রামভিত্তিক ক্যাম্পেইনের স্বচ্ছতা আপডেট",
      slug: makeSlug("Transparency update from the village campaign"),
      excerpt: "Approved donations now update campaign totals instantly after review.",
      excerptBn: "রিভিউ শেষে অনুমোদিত ডোনেশন এখন সঙ্গে সঙ্গে টোটাল আপডেট করে।",
      content: "<p>Every approved donation is reflected in public totals after review.</p>",
      contentBn: "<p>রিভিউ শেষে প্রতিটি অনুমোদিত ডোনেশন পাবলিক টোটালে দেখানো হয়।</p>",
      coverImage:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1200&q=80",
      tags: ["impact", "donations"],
      published: true,
      publishedAt: new Date(),
      category: postCategory._id,
      createdBy: admin._id,
      updatedBy: admin._id,
    },
  ]);

  await FAQ.create([
    {
      question: "When does a donation count publicly?",
      questionBn: "কখন ডোনেশন পাবলিক টোটালে গণনা হয়?",
      answer: "Only after an admin verifies the payment proof and approves the donation.",
      answerBn: "অ্যাডমিন পেমেন্ট প্রুফ যাচাই করে অনুমোদন দেওয়ার পরই ডোনেশন পাবলিক টোটালে যুক্ত হয়।",
      category: "donations",
      order: 1,
      published: true,
    },
    {
      question: "Can I donate anonymously?",
      questionBn: "আমি কি বেনামীভাবে ডোনেট করতে পারি?",
      answer: "Yes. Anonymous donors are never publicly identifiable.",
      answerBn: "হ্যাঁ। বেনামী ডোনারের পরিচয় কখনোই প্রকাশ করা হয় না।",
      category: "privacy",
      order: 2,
      published: true,
    },
  ]);

  await StaticPage.create([
    {
      slug: "about",
      title: "About ATHARO PROVA",
      titleBn: "আঠারো প্রভা সম্পর্কে",
      content: "<p>ATHARO PROVA is a student-led donation platform rooted in local action.</p>",
      contentBn: "<p>আঠারো প্রভা স্থানীয় উদ্যোগভিত্তিক শিক্ষার্থী-নেতৃত্বাধীন ডোনেশন প্ল্যাটফর্ম।</p>",
      published: true,
      updatedBy: admin._id,
    },
    {
      slug: "terms",
      title: "Terms and Conditions",
      titleBn: "শর্তাবলি",
      content: "<p>Manual verification is required before donations affect public totals.</p>",
      contentBn: "<p>পাবলিক টোটালে যুক্ত হওয়ার আগে ডোনেশন ম্যানুয়ালি যাচাই করা হয়।</p>",
      published: true,
      updatedBy: admin._id,
    },
    {
      slug: "privacy",
      title: "Privacy Policy",
      titleBn: "প্রাইভেসি পলিসি",
      content: "<p>Anonymous donors are never publicly identifiable.</p>",
      contentBn: "<p>বেনামী দাতাদের পরিচয় কখনোই প্রকাশ করা হয় না।</p>",
      published: true,
      updatedBy: admin._id,
    },
    {
      slug: "refund",
      title: "Refund Policy",
      titleBn: "রিফান্ড পলিসি",
      content: "<p>Refunds are reviewed case by case for payment or verification errors.</p>",
      contentBn: "<p>পেমেন্ট বা যাচাই সংক্রান্ত সমস্যায় কেসভিত্তিক রিফান্ড রিভিউ করা হয়।</p>",
      published: true,
      updatedBy: admin._id,
    },
  ]);

  await Testimonial.create([
    {
      name: "Rafiul Hasan",
      role: "Volunteer Coordinator",
      roleBn: "ভলান্টিয়ার সমন্বয়কারী",
      quote: "The team keeps every donation traceable, which makes local trust possible.",
      quoteBn: "প্রতিটি ডোনেশন ট্রেসেবল হওয়ায় স্থানীয় মানুষের বিশ্বাস তৈরি হয়েছে।",
      location: "Mymensingh",
      locationBn: "ময়মনসিংহ",
      featured: true,
      published: true,
    },
    {
      name: "Amena Begum",
      role: "Community beneficiary",
      roleBn: "সুবিধাভোগী",
      quote: "We saw students bring help with dignity and clarity.",
      quoteBn: "শিক্ষার্থীরা সম্মান ও স্বচ্ছতার সঙ্গে সহায়তা নিয়ে এসেছে।",
      location: "Sunamganj",
      locationBn: "সুনামগঞ্জ",
      featured: true,
      published: true,
    },
  ]);

  const donations = await Donation.create([
    {
      userId: member._id,
      campaignId: campaigns[0]._id,
      donorName: member.name,
      donorEmail: member.email,
      donorPhone: "01711111111",
      amount: 2500,
      currency: "BDT",
      isAnonymous: false,
      publicNameMode: "partial",
      publicDisplayName: partializeName(member.name),
      paymentMethod: "bkash",
      transactionId: "BK123456789",
      paymentProofUrl: "/uploads/proofs/sample-proof-1.jpg",
      status: "approved",
      verifiedBy: admin._id,
      verifiedAt: new Date(),
      donorMessage: "For urgent relief.",
    },
    {
      donorName: "Anonymous Friend",
      donorEmail: "anon@example.com",
      amount: 1500,
      currency: "BDT",
      isAnonymous: true,
      publicNameMode: "anonymous",
      publicDisplayName: "Anonymous Donor",
      paymentMethod: "nagad",
      transactionId: "NG987654321",
      paymentProofUrl: "/uploads/proofs/sample-proof-2.jpg",
      status: "pending",
      donorMessage: "Please use where needed most.",
    },
    {
      donorName: "Rejected Donor",
      donorEmail: "rejected@example.com",
      amount: 900,
      currency: "BDT",
      isAnonymous: false,
      publicNameMode: "full",
      publicDisplayName: "Rejected Donor",
      paymentMethod: "rocket",
      transactionId: "RK555444333",
      paymentProofUrl: "/uploads/proofs/sample-proof-3.jpg",
      status: "rejected",
      verifiedBy: admin._id,
      verifiedAt: new Date(),
    },
  ]);

  await Campaign.findByIdAndUpdate(campaigns[0]._id, { raisedAmount: donations[0].amount });
  await User.findByIdAndUpdate(member._id, { savedCampaignIds: [campaigns[0]._id] });

  console.info("Seed completed.");
  console.info("Super Admin: superadmin@atharoprova.org / Passw0rd!2026");
  console.info("Admin: admin@atharoprova.org / Passw0rd!2026");
  console.info("User: member@atharoprova.org / Passw0rd!2026");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
