import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { requireAuth } from "@/lib/auth/session";
import { DashboardService } from "@/server/services/dashboard.service";

export default async function DashboardReceiptsPage({
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
              <TableHead>Receipt</TableHead>
              <TableHead>Issued To</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.receipts.map((receipt) => (
              <TableRow key={receipt._id.toString()}>
                <TableCell>{receipt.receiptNumber}</TableCell>
                <TableCell>{receipt.issuedTo}</TableCell>
                <TableCell>{formatCurrency(receipt.amount, locale)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
