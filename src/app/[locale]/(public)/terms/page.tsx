import { Card, CardContent } from "@/components/ui/card";
import { ContentRepository } from "@/server/repositories/content.repository";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const page = await ContentRepository.getStaticPage("terms");

  return (
    <div className="content-grid section-spacing space-y-8">
      <h1 className="text-4xl font-black">
        {locale === "bn" ? "শর্তাবলি" : "Terms and Conditions"}
      </h1>
      <Card>
        <CardContent className="prose prose-stone max-w-none p-8 leading-8 text-muted-foreground">
          <div
            dangerouslySetInnerHTML={{
              __html:
                (page && (locale === "bn" ? page.contentBn : page.content)) ||
                (locale === "bn"
                  ? "<p>ডোনেশন ম্যানুয়ালি যাচাই করা হয় এবং অনুমোদনের আগে কোনো পাবলিক টোটালে যুক্ত হয় না।</p>"
                  : "<p>Donations are manually verified and do not affect public totals until approved.</p>"),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
