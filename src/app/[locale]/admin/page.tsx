import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/shared/stat-card";
import { DonationChart } from "@/features/analytics/components/donation-chart";
import { PaymentMethodChart } from "@/features/analytics/components/payment-method-chart";
import { AnalyticsService } from "@/server/services/analytics.service";
import { DonationRepository } from "@/server/repositories/donation.repository";
import { formatCurrency } from "@/lib/utils";

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const analytics = await AnalyticsService.getOverview();
  const recentDonations = await DonationRepository.listForAdmin();

  return (
    <div className="space-y-6">
      <div className="data-grid">
        <StatCard label="Total Donations" value={formatCurrency(analytics.totalDonations, locale)} />
        <StatCard label="Verified" value={formatCurrency(analytics.verifiedDonations, locale)} />
        <StatCard label="Pending" value={formatCurrency(analytics.pendingDonations, locale)} />
        <StatCard label="Users" value={analytics.totalUsers.toString()} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Monthly donations</h2>
            <DonationChart data={analytics.monthlyDonations} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Payment method breakdown</h2>
            <PaymentMethodChart data={analytics.paymentMethodBreakdown} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          {recentDonations.slice(0, 6).map((donation) => (
            <div key={donation._id.toString()} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{donation.donorName}</p>
                  <p className="text-sm text-muted-foreground">{donation.status}</p>
                </div>
                <p className="font-bold">{formatCurrency(donation.amount, locale)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
