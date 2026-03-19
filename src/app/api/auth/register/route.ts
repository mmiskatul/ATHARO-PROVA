import { ZodError } from "zod";
import { AuthService } from "@/server/services/auth.service";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await AuthService.register(body);
    return apiSuccess(
      {
        id: user._id.toString(),
        email: user.email,
      },
      "Account created successfully. Please verify your email when email delivery is configured.",
      201,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError(error instanceof Error ? error.message : "Unable to register.", 400);
  }
}
