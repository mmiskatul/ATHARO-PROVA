import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { staticPageSchema } from "@/lib/validators/content";
import { getZodErrorMap } from "@/lib/utils/zod";
import { StaticPage } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireApiRole("admin");
    const body = staticPageSchema.partial().parse(await request.json());
    const { id } = await params;
    await connectToDatabase();
    const page = await StaticPage.findByIdAndUpdate(
      id,
      { ...body, updatedBy: user.id },
      { new: true },
    );
    return apiSuccess(page, "Page updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to update page.", 400);
  }
}
