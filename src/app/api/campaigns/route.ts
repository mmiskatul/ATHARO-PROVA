import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { campaignSchema } from "@/lib/validators/campaign";
import { getZodErrorMap } from "@/lib/utils/zod";
import { CampaignRepository } from "@/server/repositories/campaign.repository";
import { AuditService } from "@/server/services/audit.service";

export async function GET() {
  const campaigns = await CampaignRepository.listPublic();
  return apiSuccess(campaigns);
}

export async function POST(request: Request) {
  try {
    const user = await requireApiRole("admin");
    const body = campaignSchema.parse(await request.json());
    const campaign = await CampaignRepository.create({
      ...body,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      createdBy: user.id,
    });

    await AuditService.record({
      actorUserId: user.id,
      action: "campaign.create",
      entityType: "Campaign",
      entityId: campaign._id.toString(),
      details: { slug: campaign.slug },
    });

    return apiSuccess(campaign, "Campaign created.", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError(error instanceof Error ? error.message : "Unable to create campaign.", 400);
  }
}
