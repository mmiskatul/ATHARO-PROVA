import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReviewDonationActions } from "@/features/admin/components/review-donation-actions";
import { DonationRepository } from "@/server/repositories/donation.repository";
import { formatCurrency } from "@/lib/utils";

export default async function PaymentVerificationPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const donations = await DonationRepository.listForAdmin();
  const pending = donations.filter((donation) => donation.status === "pending");

  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Proof</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pending.map((donation) => (
              <TableRow key={donation._id.toString()}>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>{formatCurrency(donation.amount, locale)}</TableCell>
                <TableCell>{donation.paymentMethod}</TableCell>
                <TableCell>{donation.transactionId}</TableCell>
                <TableCell>
                  <a href={donation.paymentProofUrl} target="_blank" className="underline" rel="noreferrer">
                    View proof
                  </a>
                </TableCell>
                <TableCell>
                  <ReviewDonationActions id={donation._id.toString()} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
