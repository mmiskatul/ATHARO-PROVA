import { Card, CardContent } from "@/components/ui/card";
import { DonationChart } from "@/features/analytics/components/donation-chart";
import { PaymentMethodChart } from "@/features/analytics/components/payment-method-chart";
import { AnalyticsService } from "@/server/services/analytics.service";

export default async function AdminAnalyticsPage() {
  const analytics = await AnalyticsService.getOverview();

  return (
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
  );
}
