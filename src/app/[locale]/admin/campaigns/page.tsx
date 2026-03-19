import { Card, CardContent } from "@/components/ui/card";
import { CampaignsTable } from "@/features/admin/components/campaigns-table";
import { CampaignRepository } from "@/server/repositories/campaign.repository";
import { formatCurrency } from "@/lib/utils";

export default async function AdminCampaignsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const campaigns = await CampaignRepository.listAdmin();

  return (
    <Card>
      <CardContent className="p-6">
        <CampaignsTable
          data={campaigns.map((campaign) => ({
            title: locale === "bn" ? campaign.titleBn : campaign.title,
            status: campaign.status,
            goal: formatCurrency(campaign.goalAmount, locale),
            raised: formatCurrency(campaign.raisedAmount, locale),
            location: locale === "bn" ? campaign.locationBn : campaign.location,
          }))}
        />
      </CardContent>
    </Card>
  );
}
