import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/features/admin/components/contact-form";
import { SettingsService } from "@/server/services/settings.service";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const settings = await SettingsService.ensureSettings();

  return (
    <div className="content-grid section-spacing grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <SectionHeading
          title={locale === "bn" ? "যোগাযোগ করুন" : "Get in touch"}
          description={
            locale === "bn"
              ? "সহযোগিতা, পার্টনারশিপ, বা সাহায্য সংক্রান্ত প্রশ্নের জন্য আমাদের লিখুন।"
              : "Reach out for support, partnerships, or general inquiries."
          }
        />
        <Card>
          <CardContent className="space-y-4 p-6 text-sm">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-muted-foreground">{settings.contactEmail}</p>
            </div>
            <div>
              <p className="font-semibold">{locale === "bn" ? "ফোন" : "Phone"}</p>
              <p className="text-muted-foreground">{settings.contactPhone}</p>
            </div>
            <div>
              <p className="font-semibold">{locale === "bn" ? "ঠিকানা" : "Address"}</p>
              <p className="text-muted-foreground">
                {locale === "bn" ? settings.addressBn : settings.address}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <ContactForm locale={locale} />
    </div>
  );
}
