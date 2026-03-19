"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import { resetPasswordSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ResetValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({
  locale,
  token,
}: {
  locale: "en" | "bn";
  token: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ResetValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
    },
  });

  async function onSubmit(values: ResetValues) {
    try {
      setIsLoading(true);
      await apiClient.post("/auth/reset-password", values);
      toast.success(locale === "bn" ? "পাসওয়ার্ড আপডেট হয়েছে।" : "Password updated.");
      router.push(`/${locale}/login`);
    } catch {
      toast.error(locale === "bn" ? "রিসেট করা যায়নি।" : "Unable to reset password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{locale === "bn" ? "নতুন পাসওয়ার্ড" : "Set a new password"}</CardTitle>
        <CardDescription>
          {locale === "bn"
            ? "একটি শক্তিশালী নতুন পাসওয়ার্ড দিন।"
            : "Choose a strong new password for your account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <input type="hidden" {...form.register("token")} />
          <div className="space-y-2">
            <Label htmlFor="password">{locale === "bn" ? "নতুন পাসওয়ার্ড" : "New password"}</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading
              ? locale === "bn"
                ? "আপডেট হচ্ছে..."
                : "Updating..."
              : locale === "bn"
                ? "পাসওয়ার্ড আপডেট করুন"
                : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
