import { ZodError } from "zod";
import { resetPasswordSchema } from "@/lib/validators/auth";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";
import { AuthService } from "@/server/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = resetPasswordSchema.parse(await request.json());
    await AuthService.resetPassword(body.token, body.password);
    return apiSuccess({ ok: true }, "Password reset completed.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError(error instanceof Error ? error.message : "Unable to reset password.", 400);
  }
}
