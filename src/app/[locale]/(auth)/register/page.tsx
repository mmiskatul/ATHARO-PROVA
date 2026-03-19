import { Link } from "@/i18n/navigation";
import { RegisterForm } from "@/features/auth/components/register-form";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;

  return (
    <div className="space-y-4">
      <RegisterForm locale={locale} />
      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="underline">
          {locale === "bn" ? "ইতোমধ্যে অ্যাকাউন্ট আছে?" : "Already have an account?"}
        </Link>
      </p>
    </div>
  );
}
