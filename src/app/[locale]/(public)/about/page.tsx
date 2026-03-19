import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContentRepository } from "@/server/repositories/content.repository";
import { SettingsService } from "@/server/services/settings.service";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const [page, settings] = await Promise.all([
    ContentRepository.getStaticPage("about"),
    SettingsService.ensureSettings(),
  ]);

  const title =
    page && (locale === "bn" ? page.titleBn : page.title) ||
    (locale === "bn" ? "আঠারো প্রভা সম্পর্কে" : "About ATHARO PROVA");
  const content =
    page && (locale === "bn" ? page.contentBn : page.content) ||
    (locale === "bn"
      ? "আঠারো প্রভা শিক্ষার্থীদের একটি উদ্যোগ, যেখানে ম্যানুয়ালি যাচাইকৃত ডোনেশনের মাধ্যমে গ্রামের মানুষ থেকে শুরু করে বৃহত্তর বাংলাদেশের মানুষের পাশে দাঁড়ানোর চেষ্টা করা হয়।"
      : "ATHARO PROVA is a student-led initiative built to organize verified giving, starting from the village and scaling to wider communities across Bangladesh.");

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading title={title} description={settings.contactEmail} />
      <Card>
        <CardContent className="prose prose-stone max-w-none p-8 leading-8 text-muted-foreground">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
      </Card>
    </div>
  );
}
