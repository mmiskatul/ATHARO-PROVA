import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { staticPageSchema } from "@/lib/validators/content";
import { getZodErrorMap } from "@/lib/utils/zod";
import { StaticPage } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";

export async function GET() {
  await connectToDatabase();
  return apiSuccess(await StaticPage.find().sort({ slug: 1 }));
}

export async function POST(request: Request) {
  try {
    const user = await requireApiRole("admin");
    const body = staticPageSchema.parse(await request.json());
    await connectToDatabase();
    const page = await StaticPage.create({ ...body, updatedBy: user.id });
    return apiSuccess(page, "Page created.", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to save page.", 400);
  }
}
