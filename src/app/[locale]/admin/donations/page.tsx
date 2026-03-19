import { Card, CardContent } from "@/components/ui/card";
import { DonationsTable } from "@/features/admin/components/donations-table";
import { DonationRepository } from "@/server/repositories/donation.repository";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDonationsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const donations = await DonationRepository.listForAdmin();

  return (
    <Card>
      <CardContent className="p-6">
        <DonationsTable
          data={donations.map((donation) => ({
            donor: donation.donorName,
            amount: formatCurrency(donation.amount, locale),
            method: donation.paymentMethod,
            campaign:
              donation.campaignId && "title" in donation.campaignId
                ? locale === "bn"
                  ? donation.campaignId.titleBn
                  : donation.campaignId.title
                : "General Fund",
            status: donation.status,
          }))}
        />
      </CardContent>
    </Card>
  );
}
