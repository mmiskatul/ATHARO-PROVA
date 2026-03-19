import Image from "next/image";
import { MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function CampaignCard({
  campaign,
  locale,
}: {
  campaign: {
    _id: string;
    slug: string;
    title: string;
    titleBn: string;
    summary: string;
    summaryBn: string;
    coverImage: string;
    location: string;
    locationBn?: string;
    goalAmount: number;
    raisedAmount: number;
    featured?: boolean;
  };
  locale: "en" | "bn";
}) {
  const title = locale === "bn" ? campaign.titleBn : campaign.title;
  const summary = locale === "bn" ? campaign.summaryBn : campaign.summary;
  const location = locale === "bn" ? campaign.locationBn || campaign.location : campaign.location;
  const progress = Math.min(
    100,
    Math.round((campaign.raisedAmount / Math.max(campaign.goalAmount, 1)) * 100),
  );

  return (
    <Card className="overflow-hidden rounded-[2rem]">
      <div className="relative aspect-[16/10] w-full">
        <Image src={campaign.coverImage} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{summary}</p>
          </div>
          {campaign.featured ? <Badge>Featured</Badge> : null}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">{formatCurrency(campaign.raisedAmount, locale)}</span>
            <span className="text-muted-foreground">
              {progress}% of {formatCurrency(campaign.goalAmount, locale)}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href={`/campaigns/${campaign.slug}/donate`}>Donate</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/campaigns/${campaign.slug}`}>Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
