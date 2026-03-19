import { Link } from "@/i18n/navigation";
import { LoginForm } from "@/features/auth/components/login-form";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
  searchParams: Promise<{ verified?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <div className="space-y-4">
      <LoginForm locale={locale} verified={resolvedSearchParams.verified} />
      <div className="text-center text-sm text-muted-foreground">
        <Link href="/forgot-password" className="underline">
          {locale === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot password?"}
        </Link>
        <span className="mx-2">•</span>
        <Link href="/register" className="underline">
          {locale === "bn" ? "নতুন অ্যাকাউন্ট" : "Create account"}
        </Link>
      </div>
    </div>
  );
}
