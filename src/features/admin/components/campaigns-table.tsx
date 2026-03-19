"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/features/admin/components/data-table";

type CampaignRow = {
  title: string;
  status: string;
  goal: string;
  raised: string;
  location: string;
};

const columns: ColumnDef<CampaignRow>[] = [
  {
    accessorKey: "title",
    header: "Campaign",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "goal",
    header: "Goal",
  },
  {
    accessorKey: "raised",
    header: "Raised",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];

export function CampaignsTable({ data }: { data: CampaignRow[] }) {
  return <DataTable columns={columns} data={data} />;
}
