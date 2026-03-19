import { SectionHeading } from "@/components/shared/section-heading";
import { PostCard } from "@/features/posts/components/post-card";
import { ContentRepository } from "@/server/repositories/content.repository";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "bn" }>;
}) {
  const { locale } = await params;
  const posts = await ContentRepository.listPosts();

  return (
    <div className="content-grid section-spacing space-y-10">
      <SectionHeading
        title={locale === "bn" ? "সংবাদ ও আপডেট" : "News and updates"}
        description={
          locale === "bn"
            ? "মাঠপর্যায়ের অগ্রগতি, শিক্ষার্থী দল, এবং স্বচ্ছতা বিষয়ক গল্প।"
            : "Field updates, student stories, and progress reports from the platform."
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id.toString()} post={post as never} locale={locale} />
        ))}
      </div>
    </div>
  );
}
