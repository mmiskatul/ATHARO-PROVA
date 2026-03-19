import { connectToDatabase } from "@/lib/db/mongoose";
import { FAQ, Post, SiteSetting, StaticPage, Testimonial } from "@/models";

export const ContentRepository = {
  async listPosts() {
    await connectToDatabase();
    return Post.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 });
  },

  async listAdminPosts() {
    await connectToDatabase();
    return Post.find().sort({ createdAt: -1 });
  },

  async getPostBySlug(slug: string) {
    await connectToDatabase();
    return Post.findOne({ slug });
  },

  async listFaqs() {
    await connectToDatabase();
    return FAQ.find({ published: true }).sort({ order: 1, createdAt: -1 });
  },

  async listAdminFaqs() {
    await connectToDatabase();
    return FAQ.find().sort({ order: 1, createdAt: -1 });
  },

  async getStaticPage(slug: string) {
    await connectToDatabase();
    return StaticPage.findOne({ slug, published: true });
  },

  async listAdminPages() {
    await connectToDatabase();
    return StaticPage.find().sort({ slug: 1 });
  },

  async getSettings() {
    await connectToDatabase();
    return SiteSetting.findOne();
  },

  async listTestimonials() {
    await connectToDatabase();
    return Testimonial.find({ published: true }).sort({ featured: -1, createdAt: -1 });
  },

  async listAdminTestimonials() {
    await connectToDatabase();
    return Testimonial.find().sort({ createdAt: -1 });
  },
};
