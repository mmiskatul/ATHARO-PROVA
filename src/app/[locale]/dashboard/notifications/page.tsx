import { Card, CardContent } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth/session";
import { DashboardService } from "@/server/services/dashboard.service";

export default async function DashboardNotificationsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const user = await requireAuth();
  const data = await DashboardService.getUserDashboard(user.id);

  return (
    <div className="grid gap-4">
      {data.notifications.map((notification) => (
        <Card key={notification._id.toString()}>
          <CardContent className="space-y-2 p-6">
            <h2 className="font-semibold">
              {locale === "bn" ? notification.titleBn : notification.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {locale === "bn" ? notification.messageBn : notification.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
