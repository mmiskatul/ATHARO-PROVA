import { z, ZodError } from "zod";
import { requireApiRole } from "@/lib/auth/api";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";
import { User } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";

const userUpdateSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["user", "moderator", "admin", "super_admin"]).optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    await requireApiRole("admin");
    await connectToDatabase();
    const users = await User.find().sort({ createdAt: -1 });
    return apiSuccess(users);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to fetch users.", 403);
  }
}

export async function PATCH(request: Request) {
  try {
    await requireApiRole("admin");
    const body = userUpdateSchema.parse(await request.json());
    await connectToDatabase();
    const user = await User.findByIdAndUpdate(
      body.userId,
      {
        ...(body.role ? { role: body.role } : {}),
        ...(typeof body.isActive === "boolean" ? { isActive: body.isActive } : {}),
      },
      { new: true },
    );
    return apiSuccess(user, "User updated.");
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError(error instanceof Error ? error.message : "Unable to update user.", 400);
  }
}
