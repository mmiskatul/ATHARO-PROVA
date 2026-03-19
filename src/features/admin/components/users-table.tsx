"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/features/admin/components/data-table";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export function UsersTable({ data }: { data: UserRow[] }) {
  return <DataTable columns={columns} data={data} />;
}
