import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/constants/locales";

export default function RootRedirectPage() {
  redirect(`/${defaultLocale}`);
}
