import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { postSchema } from "@/lib/validators/content";
import { getZodErrorMap } from "@/lib/utils/zod";
import { Post } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";
import { AuditService } from "@/server/services/audit.service";

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find().sort({ createdAt: -1 });
  return apiSuccess(posts);
}

export async function POST(request: Request) {
  try {
    const user = await requireApiRole("admin");
    const body = postSchema.parse(await request.json());
    await connectToDatabase();
    const post = await Post.create({
      ...body,
      createdBy: user.id,
      updatedBy: user.id,
      publishedAt: body.published ? new Date() : undefined,
    });

    await AuditService.record({
      actorUserId: user.id,
      action: "post.create",
      entityType: "Post",
      entityId: post._id.toString(),
      details: { slug: post.slug },
    });

    return apiSuccess(post, "Post created.", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to save post.", 400);
  }
}
