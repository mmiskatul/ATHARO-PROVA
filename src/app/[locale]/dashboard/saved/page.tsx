import { Card, CardContent } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth/session";
import { DashboardService } from "@/server/services/dashboard.service";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardSavedPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const user = await requireAuth();
  const data = await DashboardService.getUserDashboard(user.id);
  const savedCampaigns = (data.user?.savedCampaignIds || []) as Array<{
    _id: { toString(): string };
    title?: string;
    titleBn?: string;
    summary?: string;
    summaryBn?: string;
    goalAmount?: number;
  }>;

  return (
    <div className="grid gap-4">
      {savedCampaigns.map((campaign) => (
        <Card key={campaign._id.toString()}>
          <CardContent className="flex items-center justify-between gap-4 p-6">
            <div>
              <h2 className="text-lg font-semibold">
                {"title" in campaign ? (locale === "bn" ? campaign.titleBn : campaign.title) : ""}
              </h2>
              <p className="text-sm text-muted-foreground">
                {"summary" in campaign
                  ? locale === "bn"
                    ? campaign.summaryBn
                    : campaign.summary
                  : ""}
              </p>
            </div>
            {"goalAmount" in campaign ? (
              <p className="text-sm font-semibold">
                {formatCurrency(campaign.goalAmount ?? 0, locale)}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
