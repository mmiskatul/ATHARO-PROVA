import { ZodError } from "zod";
import { getApiUser, requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";
import { DonationService } from "@/server/services/donation.service";
import { DonationRepository } from "@/server/repositories/donation.repository";
import { AuditService } from "@/server/services/audit.service";

export async function GET() {
  try {
    await requireApiRole("moderator");
    const donations = await DonationRepository.listForAdmin();
    return apiSuccess(donations);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to fetch donations.", 403);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getApiUser();
    const body = await request.json();
    const donation = await DonationService.createDonation(body, user?.id);

    if (user) {
      await AuditService.record({
        actorUserId: user.id,
        action: "donation.create",
        entityType: "Donation",
        entityId: donation._id.toString(),
        details: { amount: donation.amount, paymentMethod: donation.paymentMethod },
      });
    }

    return apiSuccess(donation, "Donation submitted for manual verification.", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError(error instanceof Error ? error.message : "Donation could not be submitted.", 400);
  }
}
