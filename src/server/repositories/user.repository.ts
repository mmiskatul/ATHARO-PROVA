import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models";
import type { Role } from "@/lib/constants/roles";

export const UserRepository = {
  async findByEmail(email: string) {
    await connectToDatabase();
    return User.findOne({ email: email.toLowerCase() });
  },

  async findCredentialsUserByEmail(email: string) {
    await connectToDatabase();
    return User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
  },

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    preferredLanguage: "en" | "bn";
    role?: Role;
  }) {
    await connectToDatabase();
    return User.create(data);
  },

  async getById(id: string) {
    await connectToDatabase();
    return User.findById(id);
  },

  async list() {
    await connectToDatabase();
    return User.find().sort({ createdAt: -1 });
  },

  async updateRole(userId: string, role: Role) {
    await connectToDatabase();
    return User.findByIdAndUpdate(userId, { role }, { new: true });
  },

  async toggleSavedCampaign(userId: string, campaignId: string) {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) return null;

    const objectId = new Types.ObjectId(campaignId);
    const exists = user.savedCampaignIds.some((saved: Types.ObjectId) => saved.equals(objectId));

    user.savedCampaignIds = exists
      ? user.savedCampaignIds.filter((saved: Types.ObjectId) => !saved.equals(objectId))
      : [...user.savedCampaignIds, objectId];

    await user.save();
    return user;
  },
};
