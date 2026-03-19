import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { formatCurrency } from "@/lib/utils";
import { requireAuth } from "@/lib/auth/session";
import { DashboardService } from "@/server/services/dashboard.service";

export default async function DashboardOverviewPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const user = await requireAuth();
  const data = await DashboardService.getUserDashboard(user.id);
  const approved = data.donations.filter((donation) => donation.status === "approved");

  return (
    <div className="space-y-6">
      <div className="data-grid">
        <StatCard
          label={locale === "bn" ? "মোট ডোনেশন" : "Total donated"}
          value={formatCurrency(
            approved.reduce((sum, donation) => sum + donation.amount, 0),
            locale,
          )}
        />
        <StatCard
          label={locale === "bn" ? "মোট রিসিপ্ট" : "Receipts"}
          value={data.receipts.length.toString()}
        />
        <StatCard
          label={locale === "bn" ? "সেভ করা ক্যাম্পেইন" : "Saved campaigns"}
          value={String(data.user?.savedCampaignIds?.length ?? 0)}
        />
        <StatCard
          label={locale === "bn" ? "নোটিফিকেশন" : "Notifications"}
          value={data.notifications.length.toString()}
        />
      </div>
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">
            {locale === "bn" ? "সাম্প্রতিক ডোনেশন" : "Recent donations"}
          </h2>
          <div className="space-y-3">
            {data.donations.slice(0, 5).map((donation) => (
              <div key={donation._id.toString()} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">
                      {donation.campaignId && "title" in donation.campaignId
                        ? locale === "bn"
                          ? donation.campaignId.titleBn
                          : donation.campaignId.title
                        : locale === "bn"
                          ? "জেনারেল ফান্ড"
                          : "General fund"}
                    </p>
                    <p className="text-sm text-muted-foreground">{donation.status}</p>
                  </div>
                  <p className="text-lg font-bold">{formatCurrency(donation.amount, locale)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
