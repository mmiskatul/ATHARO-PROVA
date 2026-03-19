import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { campaignSchema } from "@/lib/validators/campaign";
import { getZodErrorMap } from "@/lib/utils/zod";
import { CampaignRepository } from "@/server/repositories/campaign.repository";
import { AuditService } from "@/server/services/audit.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const campaign = await CampaignRepository.getById(id);
  if (!campaign) {
    return apiError("Campaign not found.", 404);
  }
  return apiSuccess(campaign);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireApiRole("admin");
    const body = campaignSchema.partial().parse(await request.json());
    const { id } = await params;
    const campaign = await CampaignRepository.update(id, body);

    await AuditService.record({
      actorUserId: user.id,
      action: "campaign.update",
      entityType: "Campaign",
      entityId: id,
      details: body,
    });

    return apiSuccess(campaign, "Campaign updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError(error instanceof Error ? error.message : "Unable to update campaign.", 400);
  }
}
