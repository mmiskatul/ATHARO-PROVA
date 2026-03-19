import { Card, CardContent } from "@/components/ui/card";
import { ContentRepository } from "@/server/repositories/content.repository";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const page = await ContentRepository.getStaticPage("privacy");

  return (
    <div className="content-grid section-spacing space-y-8">
      <h1 className="text-4xl font-black">{locale === "bn" ? "প্রাইভেসি পলিসি" : "Privacy Policy"}</h1>
      <Card>
        <CardContent className="prose prose-stone max-w-none p-8 leading-8 text-muted-foreground">
          <div
            dangerouslySetInnerHTML={{
              __html:
                (page && (locale === "bn" ? page.contentBn : page.content)) ||
                (locale === "bn"
                  ? "<p>বেনামী ডোনারের পরিচয় কখনোই পাবলিকভাবে প্রকাশ করা হয় না।</p>"
                  : "<p>Anonymous donors are never publicly identifiable on the platform.</p>"),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
