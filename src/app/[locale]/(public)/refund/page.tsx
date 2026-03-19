import { Card, CardContent } from "@/components/ui/card";
import { ContentRepository } from "@/server/repositories/content.repository";

export default async function RefundPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const page = await ContentRepository.getStaticPage("refund");

  return (
    <div className="content-grid section-spacing space-y-8">
      <h1 className="text-4xl font-black">{locale === "bn" ? "রিফান্ড পলিসি" : "Refund Policy"}</h1>
      <Card>
        <CardContent className="prose prose-stone max-w-none p-8 leading-8 text-muted-foreground">
          <div
            dangerouslySetInnerHTML={{
              __html:
                (page && (locale === "bn" ? page.contentBn : page.content)) ||
                (locale === "bn"
                  ? "<p>ভেরিফিকেশন বা প্রসেসিং ত্রুটি থাকলে অ্যাডমিন রিফান্ড রিভিউ করতে পারে।</p>"
                  : "<p>Refunds may be reviewed by admins where there is a processing or verification issue.</p>"),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
