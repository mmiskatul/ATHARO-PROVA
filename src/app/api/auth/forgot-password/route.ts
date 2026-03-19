import { ZodError } from "zod";
import { forgotPasswordSchema } from "@/lib/validators/auth";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";
import { AuthService } from "@/server/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = forgotPasswordSchema.parse(await request.json());
    await AuthService.requestPasswordReset(body.email);
    return apiSuccess(
      { ok: true },
      "If an account exists, a password reset link has been prepared.",
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError("Unable to process request.", 400);
  }
}
