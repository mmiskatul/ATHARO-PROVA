import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContentRepository } from "@/server/repositories/content.repository";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const faqs = await ContentRepository.listFaqs();

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading
        title={locale === "bn" ? "প্রশ্ন ও উত্তর" : "Frequently asked questions"}
        description={
          locale === "bn"
            ? "ডোনেশন, যাচাই, রিফান্ড এবং প্রাইভেসি বিষয়ে সাধারণ প্রশ্ন।"
            : "Common questions about donations, verification, refunds, and privacy."
        }
      />
      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq._id.toString()}>
            <CardContent className="space-y-3 p-6">
              <h2 className="text-lg font-semibold">
                {locale === "bn" ? faq.questionBn : faq.question}
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                {locale === "bn" ? faq.answerBn : faq.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
