import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";
import { DonationService } from "@/server/services/donation.service";
import { AuditService } from "@/server/services/audit.service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const reviewer = await requireApiRole("moderator");
    const body = await request.json();
    const { id } = await params;
    const donation = await DonationService.reviewDonation(id, reviewer.id, body);

    await AuditService.record({
      actorUserId: reviewer.id,
      action: `donation.${donation?.status}`,
      entityType: "Donation",
      entityId: id,
      details: { status: donation?.status },
    });

    return apiSuccess(donation, "Donation review saved.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError(error instanceof Error ? error.message : "Unable to review donation.", 400);
  }
}
