import { ContentRepository } from "@/server/repositories/content.repository";
import { SettingsService } from "@/server/services/settings.service";

export const ContentService = {
  async getHomePageData() {
    const [settings, campaigns, posts, faqs, testimonials, donationFeed] = await Promise.all([
      SettingsService.ensureSettings(),
      (await import("@/server/repositories/campaign.repository")).CampaignRepository.listPublic(),
      ContentRepository.listPosts(),
      ContentRepository.listFaqs(),
      ContentRepository.listTestimonials(),
      (await import("@/server/repositories/donation.repository")).DonationRepository.listApprovedFeed(
        6,
      ),
    ]);

    return {
      settings,
      campaigns: campaigns.slice(0, 3),
      posts: posts.slice(0, 3),
      faqs: faqs.slice(0, 4),
      testimonials: testimonials.slice(0, 3),
      donationFeed,
    };
  },
};
