import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SaveCampaignButton } from "@/features/campaigns/components/save-campaign-button";
import { formatCurrency } from "@/lib/utils";
import { CampaignRepository } from "@/server/repositories/campaign.repository";
import { DonationRepository } from "@/server/repositories/donation.repository";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const campaign = await CampaignRepository.getBySlug(slug);
  if (!campaign) notFound();

  const donations = await DonationRepository.listApprovedFeed(8);
  const title = locale === "bn" ? campaign.titleBn : campaign.title;
  const description = locale === "bn" ? campaign.descriptionBn : campaign.description;
  const summary = locale === "bn" ? campaign.summaryBn : campaign.summary;
  const location = locale === "bn" ? campaign.locationBn : campaign.location;
  const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));

  return (
    <div className="content-grid section-spacing grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <div className="space-y-5">
          <Badge>{campaign.status}</Badge>
          <h1 className="text-balance text-4xl font-black">{title}</h1>
          <p className="text-lg leading-8 text-muted-foreground">{summary}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </div>
        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-stone max-w-none leading-8 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-6 p-8">
            <div>
              <p className="text-sm text-muted-foreground">
                {locale === "bn" ? "উঠানো হয়েছে" : "Raised"}
              </p>
              <p className="mt-2 text-4xl font-black">
                {formatCurrency(campaign.raisedAmount, locale)}
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-muted">
                <div className="h-3 rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-sm text-muted-foreground">
                {progress}% of {formatCurrency(campaign.goalAmount, locale)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="flex-1">
                <Link href={`/campaigns/${campaign.slug}/donate`}>
                  {locale === "bn" ? "ডোনেট করুন" : "Donate"}
                </Link>
              </Button>
              <SaveCampaignButton campaignId={campaign._id.toString()} locale={locale} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-lg font-semibold">
              {locale === "bn" ? "সাম্প্রতিক দাতা" : "Recent donors"}
            </h2>
            <div className="space-y-3">
              {donations
                .filter((item) => item.campaignId?.toString() === campaign._id.toString())
                .map((donation) => (
                  <div key={donation._id.toString()} className="rounded-2xl bg-muted/50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-semibold">{donation.publicDisplayName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(donation.amount, locale)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
