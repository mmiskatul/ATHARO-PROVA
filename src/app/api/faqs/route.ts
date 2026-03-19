import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { faqSchema } from "@/lib/validators/content";
import { getZodErrorMap } from "@/lib/utils/zod";
import { FAQ } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";
import { AuditService } from "@/server/services/audit.service";

export async function GET() {
  await connectToDatabase();
  return apiSuccess(await FAQ.find().sort({ order: 1, createdAt: -1 }));
}

export async function POST(request: Request) {
  try {
    const user = await requireApiRole("admin");
    const body = faqSchema.parse(await request.json());
    await connectToDatabase();
    const faq = await FAQ.create(body);

    await AuditService.record({
      actorUserId: user.id,
      action: "faq.create",
      entityType: "FAQ",
      entityId: faq._id.toString(),
      details: { category: faq.category },
    });

    return apiSuccess(faq, "FAQ created.", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to save FAQ.", 400);
  }
}
