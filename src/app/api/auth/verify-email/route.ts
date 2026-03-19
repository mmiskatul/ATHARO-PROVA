import { redirect } from "next/navigation";
import { AuthService } from "@/server/services/auth.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    redirect("/en/login?verified=missing");
  }

  try {
    await AuthService.verifyEmail(token);
    redirect("/en/login?verified=success");
  } catch {
    redirect("/en/login?verified=invalid");
  }
}
