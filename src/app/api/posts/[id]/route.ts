import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { postSchema } from "@/lib/validators/content";
import { getZodErrorMap } from "@/lib/utils/zod";
import { Post } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";
import { AuditService } from "@/server/services/audit.service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireApiRole("admin");
    const body = postSchema.partial().parse(await request.json());
    const { id } = await params;
    await connectToDatabase();
    const post = await Post.findByIdAndUpdate(
      id,
      { ...body, updatedBy: user.id, ...(body.published ? { publishedAt: new Date() } : {}) },
      { new: true },
    );

    await AuditService.record({
      actorUserId: user.id,
      action: "post.update",
      entityType: "Post",
      entityId: id,
      details: body,
    });

    return apiSuccess(post, "Post updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to update post.", 400);
  }
}
