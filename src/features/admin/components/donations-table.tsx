"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/features/admin/components/data-table";

type DonationRow = {
  donor: string;
  amount: string;
  method: string;
  campaign: string;
  status: string;
};

const columns: ColumnDef<DonationRow>[] = [
  {
    accessorKey: "donor",
    header: "Donor",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export function DonationsTable({ data }: { data: DonationRow[] }) {
  return <DataTable columns={columns} data={data} />;
}
