import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function PostCard({
  post,
  locale,
}: {
  post: {
    slug: string;
    title: string;
    titleBn: string;
    excerpt: string;
    excerptBn: string;
    coverImage?: string;
    publishedAt?: string | Date;
    createdAt: string | Date;
  };
  locale: "en" | "bn";
}) {
  const title = locale === "bn" ? post.titleBn : post.title;
  const excerpt = locale === "bn" ? post.excerptBn : post.excerpt;
  const date = post.publishedAt || post.createdAt;

  return (
    <Card className="overflow-hidden">
      {post.coverImage ? (
        <div className="relative aspect-[16/10] w-full">
          <Image src={post.coverImage} alt={title} fill className="object-cover" />
        </div>
      ) : null}
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          {formatDate(date, locale)}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{excerpt}</p>
        <Button asChild variant="outline">
          <Link href={`/news/${post.slug}`}>Read article</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
