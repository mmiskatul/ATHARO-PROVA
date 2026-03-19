import { Card, CardContent } from "@/components/ui/card";
import { UsersTable } from "@/features/admin/components/users-table";
import { UserRepository } from "@/server/repositories/user.repository";

export default async function AdminUsersPage() {
  const users = await UserRepository.list();

  return (
    <Card>
      <CardContent className="p-6">
        <UsersTable
          data={users.map((user) => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.isActive ? "active" : "inactive",
          }))}
        />
      </CardContent>
    </Card>
  );
}
