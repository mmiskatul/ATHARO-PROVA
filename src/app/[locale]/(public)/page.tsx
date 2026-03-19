import { ArrowRight, CircleCheckBig, Landmark, ReceiptText, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCard } from "@/components/shared/stat-card";
import { CampaignCard } from "@/features/campaigns/components/campaign-card";
import { PostCard } from "@/features/posts/components/post-card";
import { formatCurrency } from "@/lib/utils";
import { ContentService } from "@/server/services/content.service";
import { AnalyticsService } from "@/server/services/analytics.service";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const [content, analytics] = await Promise.all([
    ContentService.getHomePageData(),
    AnalyticsService.getOverview(),
  ]);

  const heroTitle =
    locale === "bn"
      ? content.settings.homepageContent.heroTitleBn
      : content.settings.homepageContent.heroTitle;
  const heroSubtitle =
    locale === "bn"
      ? content.settings.homepageContent.heroSubtitleBn
      : content.settings.homepageContent.heroSubtitle;
  const missionTitle =
    locale === "bn"
      ? content.settings.homepageContent.missionTitleBn
      : content.settings.homepageContent.missionTitle;
  const missionBody =
    locale === "bn"
      ? content.settings.homepageContent.missionBodyBn
      : content.settings.homepageContent.missionBody;

  return (
    <div>
      <section className="hero-gradient border-b border-border/60">
        <div className="content-grid section-spacing grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {locale === "bn"
                ? "যাচাইকৃত ডোনেশন ও স্বচ্ছতা"
                : "Verified donations and transparent impact"}
            </div>
            <div className="space-y-5">
              <h1 className="text-balance text-5xl font-black leading-tight tracking-tight sm:text-6xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
                {heroSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/donate">
                  {locale === "bn" ? "এখনই ডোনেট করুন" : "Donate now"}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/campaigns">
                  {locale === "bn" ? "ক্যাম্পেইন দেখুন" : "Browse campaigns"}
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label={locale === "bn" ? "যাচাইকৃত ডোনেশন" : "Verified donations"}
                value={formatCurrency(analytics.verifiedDonations, locale)}
              />
              <StatCard
                label={locale === "bn" ? "ব্যবহারকারী" : "Users"}
                value={analytics.totalUsers.toString()}
              />
              <StatCard
                label={locale === "bn" ? "ক্যাম্পেইন" : "Campaigns"}
                value={analytics.totalCampaigns.toString()}
              />
            </div>
          </div>
          <Card className="overflow-hidden border-none bg-[#fffaf4]">
            <CardContent className="space-y-6 p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-secondary p-5 text-secondary-foreground">
                  <ShieldCheck className="mb-4 h-8 w-8" />
                  <h3 className="text-lg font-semibold">
                    {locale === "bn" ? "শুধু অনুমোদিত টোটাল" : "Approved-only totals"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-secondary-foreground/80">
                    {locale === "bn"
                      ? "শুধু অনুমোদিত ডোনেশনই পাবলিক টোটালে গণনা হয়।"
                      : "Only admin-approved donations affect public campaign totals."}
                  </p>
                </div>
                <div className="rounded-3xl bg-primary p-5 text-primary-foreground">
                  <ReceiptText className="mb-4 h-8 w-8" />
                  <h3 className="text-lg font-semibold">
                    {locale === "bn" ? "ম্যানুয়াল যাচাই" : "Manual verification"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/80">
                    {locale === "bn"
                      ? "bKash, Nagad, Rocket ও ব্যাংক ট্রান্সফার সাপোর্টেড।"
                      : "Supports bKash, Nagad, Rocket, and bank transfer workflows."}
                  </p>
                </div>
              </div>
              <div className="rounded-[2rem] border border-border/70 bg-white p-6">
                <h3 className="text-lg font-semibold">{missionTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{missionBody}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: CircleCheckBig,
                    title: locale === "bn" ? "প্রুফ আপলোড" : "Proof uploads",
                    body:
                      locale === "bn"
                        ? "প্রতিটি ডোনেশন ট্রানজ্যাকশন আইডি ও স্ক্রিনশটসহ জমা হয়।"
                        : "Each donation includes transaction ID and payment proof.",
                  },
                  {
                    icon: Landmark,
                    title: locale === "bn" ? "স্কেলযোগ্য কাঠামো" : "Scalable foundation",
                    body:
                      locale === "bn"
                        ? "গ্রাম থেকে শুরু করে আরও অঞ্চলে সম্প্রসারণের জন্য প্রস্তুত।"
                        : "Built to grow from one village to broader regions.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border bg-background p-5">
                    <item.icon className="mb-3 h-6 w-6 text-secondary" />
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section-spacing">
        <div className="content-grid space-y-10">
          <SectionHeading
            eyebrow={locale === "bn" ? "ফিচারড ক্যাম্পেইন" : "Featured campaigns"}
            title={locale === "bn" ? "যেখানে আপনার ডোনেশন দ্রুত প্রভাব ফেলবে" : "Where your contribution can move quickly"}
            description={
              locale === "bn"
                ? "যাচাইকৃত ক্যাম্পেইনগুলো দেখুন এবং প্রুফ-ভিত্তিক ডোনেশন জমা দিন।"
                : "Browse active campaigns and submit proof-backed donations with full transparency."
            }
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {content.campaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id.toString()}
                locale={locale}
                campaign={{
                  _id: campaign._id.toString(),
                  slug: campaign.slug,
                  title: campaign.title,
                  titleBn: campaign.titleBn,
                  summary: campaign.summary,
                  summaryBn: campaign.summaryBn,
                  coverImage: campaign.coverImage,
                  location: campaign.location,
                  locationBn: campaign.locationBn,
                  goalAmount: campaign.goalAmount,
                  raisedAmount: campaign.raisedAmount,
                  featured: campaign.featured,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#fff8ef]">
        <div className="content-grid grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={locale === "bn" ? "কিভাবে কাজ করে" : "How it works"}
            title={locale === "bn" ? "ডোনেশন থেকে প্রভাব: স্পষ্ট ধাপ" : "A clear path from donation to verified impact"}
            description={
              locale === "bn"
                ? "বাংলাদেশ-ফ্রেন্ডলি পেমেন্ট মাধ্যম ও ম্যানুয়াল যাচাইয়ের মাধ্যমে স্বচ্ছ সহায়তা।"
                : "Bangladesh-friendly payment methods with manual verification and traceable transparency."
            }
          />
          <div className="grid gap-4">
            {[
              locale === "bn"
                ? "১. ক্যাম্পেইন বা জেনারেল ফান্ড নির্বাচন করুন।"
                : "1. Choose a campaign or the general fund.",
              locale === "bn"
                ? "২. bKash, Nagad, Rocket বা ব্যাংক ট্রান্সফার ব্যবহার করুন।"
                : "2. Pay with bKash, Nagad, Rocket, or bank transfer.",
              locale === "bn"
                ? "৩. ট্রানজ্যাকশন আইডি ও স্ক্রিনশট জমা দিন।"
                : "3. Submit transaction ID and proof screenshot.",
              locale === "bn"
                ? "৪. অ্যাডমিন ভেরিফাই করলে টোটালে যুক্ত হবে।"
                : "4. After admin approval, totals update publicly.",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6 text-base font-medium">{item}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="content-grid space-y-10">
          <SectionHeading
            eyebrow={locale === "bn" ? "স্বচ্ছতা ফিড" : "Transparency feed"}
            title={locale === "bn" ? "সাম্প্রতিক অনুমোদিত ডোনেশন" : "Recent approved donations"}
            description={
              locale === "bn"
                ? "প্রাইভেসি সেটিং অনুযায়ী প্রদর্শিত পাবলিক ডোনেশন ফিড।"
                : "Public donation feed respecting each donor's selected privacy preference."
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {content.donationFeed.map((donation) => (
              <Card key={donation._id.toString()}>
                <CardContent className="space-y-3 p-6">
                  <p className="text-sm font-semibold text-primary">
                    {donation.publicDisplayName}
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(donation.amount, locale)}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {donation.donorMessage ||
                      (locale === "bn"
                        ? "কোনো অতিরিক্ত বার্তা নেই।"
                        : "No public donor message.")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#fff8ef]">
        <div className="content-grid space-y-10">
          <SectionHeading
            eyebrow={locale === "bn" ? "সংবাদ ও আপডেট" : "News and updates"}
            title={locale === "bn" ? "মাঠপর্যায়ের গল্প ও অগ্রগতি" : "Stories, field updates, and platform progress"}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {content.posts.map((post) => (
              <PostCard key={post._id.toString()} post={post as never} locale={locale} />
            ))}
          </div>
          <div className="flex justify-end">
            <Button asChild variant="outline">
              <Link href="/news">
                {locale === "bn" ? "সব সংবাদ দেখুন" : "View all news"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
