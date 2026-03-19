import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/shared/section-heading";
import { DonationForm } from "@/features/donations/components/donation-form";
import { CampaignRepository } from "@/server/repositories/campaign.repository";
import { SettingsService } from "@/server/services/settings.service";

export default async function CampaignDonatePage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [campaign, settings] = await Promise.all([
    CampaignRepository.getBySlug(slug),
    SettingsService.ensureSettings(),
  ]);

  if (!campaign) notFound();

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading
        title={locale === "bn" ? campaign.titleBn : campaign.title}
        description={
          locale === "bn"
            ? "পেমেন্ট প্রুফ ও ট্রানজ্যাকশন আইডিসহ ডোনেশন জমা দিন।"
            : "Submit your donation with transaction ID and payment proof."
        }
      />
      <DonationForm
        locale={locale}
        campaignId={campaign._id.toString()}
        campaignTitle={locale === "bn" ? campaign.titleBn : campaign.title}
        paymentInstructions={JSON.parse(JSON.stringify(settings.paymentInstructions))}
      />
    </div>
  );
}
