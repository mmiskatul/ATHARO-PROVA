import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { AnalyticsService } from "@/server/services/analytics.service";

export async function GET() {
  try {
    await requireApiRole("moderator");
    const analytics = await AnalyticsService.getOverview();
    return apiSuccess(analytics);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to fetch analytics.", 403);
  }
}
