import { ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { siteSettingSchema } from "@/lib/validators/settings";
import { getZodErrorMap } from "@/lib/utils/zod";
import { SettingsService } from "@/server/services/settings.service";
import { SiteSetting } from "@/models";

export async function GET() {
  const settings = await SettingsService.ensureSettings();
  return apiSuccess(settings);
}

export async function PATCH(request: Request) {
  try {
    await requireApiRole("admin");
    const body = siteSettingSchema.parse(await request.json());
    const current = await SettingsService.ensureSettings();
    const settings = await SiteSetting.findByIdAndUpdate(current._id, body, {
      new: true,
    });
    return apiSuccess(settings, "Settings updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to update settings.", 400);
  }
}
