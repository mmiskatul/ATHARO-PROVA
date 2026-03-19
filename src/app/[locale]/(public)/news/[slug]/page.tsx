import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ContentRepository } from "@/server/repositories/content.repository";
import { formatDate } from "@/lib/utils";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn"; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await ContentRepository.getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="content-grid section-spacing space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
          {formatDate(post.publishedAt || post.createdAt, locale)}
        </p>
        <h1 className="text-balance text-4xl font-black">
          {locale === "bn" ? post.titleBn : post.title}
        </h1>
      </div>
      <Card>
        <CardContent className="prose prose-stone max-w-none p-8 leading-8 text-muted-foreground">
          <div
            dangerouslySetInnerHTML={{
              __html: locale === "bn" ? post.contentBn : post.content,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
