import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCard } from "@/components/shared/stat-card";
import { formatCurrency } from "@/lib/utils";
import { AnalyticsService } from "@/server/services/analytics.service";
import { DonationRepository } from "@/server/repositories/donation.repository";

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const [analytics, donations] = await Promise.all([
    AnalyticsService.getOverview(),
    DonationRepository.listApprovedFeed(12),
  ]);

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading
        title={locale === "bn" ? "প্রভাব ও স্বচ্ছতা" : "Impact and transparency"}
        description={
          locale === "bn"
            ? "শুধু যাচাইকৃত ডোনেশনই এখানে দেখানো হয়।"
            : "Only verified donations are included in public impact reporting."
        }
      />
      <div className="data-grid">
        <StatCard
          label={locale === "bn" ? "মোট যাচাইকৃত ডোনেশন" : "Total verified donations"}
          value={formatCurrency(analytics.verifiedDonations, locale)}
        />
        <StatCard
          label={locale === "bn" ? "অপেক্ষমাণ ডোনেশন" : "Pending donations"}
          value={formatCurrency(analytics.pendingDonations, locale)}
        />
        <StatCard
          label={locale === "bn" ? "সক্রিয় ব্যবহারকারী" : "Users"}
          value={analytics.totalUsers.toString()}
        />
        <StatCard
          label={locale === "bn" ? "ক্যাম্পেইন" : "Campaigns"}
          value={analytics.totalCampaigns.toString()}
        />
      </div>
      <Card>
        <CardContent className="space-y-4 p-8">
          <h2 className="text-xl font-semibold">
            {locale === "bn" ? "সাম্প্রতিক অনুমোদিত ডোনেশন" : "Recently approved donations"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {donations.map((donation) => (
              <div key={donation._id.toString()} className="rounded-3xl border border-border p-5">
                <p className="font-semibold">{donation.publicDisplayName}</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(donation.amount, locale)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {donation.donorMessage ||
                    (locale === "bn" ? "কোনো বার্তা নেই।" : "No public donor note.")}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
