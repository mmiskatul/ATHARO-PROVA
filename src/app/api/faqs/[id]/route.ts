import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { faqSchema } from "@/lib/validators/content";
import { getZodErrorMap } from "@/lib/utils/zod";
import { FAQ } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireApiRole("admin");
    const body = faqSchema.partial().parse(await request.json());
    const { id } = await params;
    await connectToDatabase();
    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    return apiSuccess(faq, "FAQ updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to update FAQ.", 400);
  }
}
