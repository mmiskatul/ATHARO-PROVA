import { SiteSettingsForm } from "@/features/admin/components/site-settings-form";
import { SettingsService } from "@/server/services/settings.service";

export default async function HomepageContentPage() {
  const settings = await SettingsService.ensureSettings();

  return (
    <SiteSettingsForm
      defaultValues={JSON.parse(
        JSON.stringify({
          siteName: settings.siteName,
          siteNameBn: settings.siteNameBn,
          logo: settings.logo || "",
          favicon: settings.favicon || "",
          contactEmail: settings.contactEmail,
          contactPhone: settings.contactPhone,
          address: settings.address,
          addressBn: settings.addressBn,
          defaultLocale: settings.defaultLocale,
          currency: settings.currency,
          guestDonationEnabled: settings.guestDonationEnabled,
          paymentInstructions: settings.paymentInstructions,
          homepageContent: settings.homepageContent,
        }),
      )}
    />
  );
}
