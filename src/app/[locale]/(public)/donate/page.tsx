import { SectionHeading } from "@/components/shared/section-heading";
import { DonationForm } from "@/features/donations/components/donation-form";
import { SettingsService } from "@/server/services/settings.service";

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const settings = await SettingsService.ensureSettings();

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading
        title={locale === "bn" ? "জেনারেল ফান্ডে ডোনেশন" : "Donate to the general fund"}
        description={
          locale === "bn"
            ? "যেখানে সবচেয়ে বেশি প্রয়োজন, সেখানে সহায়তা পৌঁছাতে আপনার ডোনেশন ব্যবহৃত হবে।"
            : "Support the areas of highest need through the ATHARO PROVA general fund."
        }
      />
      <DonationForm
        locale={locale}
        paymentInstructions={JSON.parse(JSON.stringify(settings.paymentInstructions))}
      />
    </div>
  );
}
