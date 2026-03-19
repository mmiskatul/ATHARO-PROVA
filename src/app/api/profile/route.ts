import { z, ZodError } from "zod";
import { auth } from "@/auth";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/models";

const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional().or(z.literal("")),
  preferredLanguage: z.enum(["en", "bn"]),
});

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return apiError("Unauthorized", 401);
    }

    const body = profileSchema.parse(await request.json());
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: body.name,
        phone: body.phone || undefined,
        preferredLanguage: body.preferredLanguage,
      },
      { new: true },
    );

    return apiSuccess(user, "Profile updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }

    return apiError("Unable to update profile.", 400);
  }
}
