import { SectionHeading } from "@/components/shared/section-heading";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { CampaignRepository } from "@/server/repositories/campaign.repository";

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const campaigns = await CampaignRepository.listPublic();

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading
        title={locale === "bn" ? "সক্রিয় ক্যাম্পেইন" : "Active campaigns"}
        description={
          locale === "bn"
            ? "যাচাইকৃত ডোনেশন, প্রুফ আপলোড এবং স্বচ্ছ অগ্রগতি সহ।"
            : "Verified donation workflows with proof uploads and transparent progress."
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id.toString()}
            locale={locale}
            campaign={{
              _id: campaign._id.toString(),
              slug: campaign.slug,
              title: campaign.title,
              titleBn: campaign.titleBn,
              summary: campaign.summary,
              summaryBn: campaign.summaryBn,
              coverImage: campaign.coverImage,
              location: campaign.location,
              locationBn: campaign.locationBn,
              goalAmount: campaign.goalAmount,
              raisedAmount: campaign.raisedAmount,
              featured: campaign.featured,
            }}
          />
        ))}
      </div>
    </div>
  );
}
