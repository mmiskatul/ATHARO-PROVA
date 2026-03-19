import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { requireAuth } from "@/lib/auth/session";
import { DashboardService } from "@/server/services/dashboard.service";

export default async function DashboardDonationsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const user = await requireAuth();
  const data = await DashboardService.getUserDashboard(user.id);

  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.donations.map((donation) => (
              <TableRow key={donation._id.toString()}>
                <TableCell>
                  {donation.campaignId && "title" in donation.campaignId
                    ? locale === "bn"
                      ? donation.campaignId.titleBn
                      : donation.campaignId.title
                    : locale === "bn"
                      ? "জেনারেল ফান্ড"
                      : "General fund"}
                </TableCell>
                <TableCell>{formatCurrency(donation.amount, locale)}</TableCell>
                <TableCell>{donation.paymentMethod}</TableCell>
                <TableCell>{donation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
