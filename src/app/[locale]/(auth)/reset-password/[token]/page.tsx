import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn"; token: string }>;
}) {
  const { locale, token } = await params;
  return <ResetPasswordForm locale={locale} token={token} />;
}
