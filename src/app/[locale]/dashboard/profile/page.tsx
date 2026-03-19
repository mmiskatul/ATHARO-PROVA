import { requireAuth } from "@/lib/auth/session";
import { ProfileForm } from "@/features/users/components/profile-form";

export default async function DashboardProfilePage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const user = await requireAuth();

  return (
    <ProfileForm
      locale={locale}
      defaultValues={{
        name: user.name ?? "",
        phone: "",
        preferredLanguage: user.preferredLanguage,
      }}
    />
  );
}
