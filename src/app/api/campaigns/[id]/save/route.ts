import { auth } from "@/auth";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { UserRepository } from "@/server/repositories/user.repository";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return apiError("Unauthorized", 401);
  }

  const { id } = await params;
  const user = await UserRepository.toggleSavedCampaign(session.user.id, id);
  return apiSuccess(user, "Saved campaigns updated.");
}
