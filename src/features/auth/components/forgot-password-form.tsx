"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import { forgotPasswordSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ForgotValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm({ locale }: { locale: "en" | "bn" }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ForgotValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotValues) {
    try {
      setIsLoading(true);
      await apiClient.post("/auth/forgot-password", values);
      toast.success(
        locale === "bn"
          ? "রিসেট লিংক প্রস্তুত করা হয়েছে।"
          : "Password reset link prepared if the account exists.",
      );
    } catch {
      toast.error(locale === "bn" ? "অনুরোধ সম্পন্ন হয়নি।" : "Request failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{locale === "bn" ? "পাসওয়ার্ড রিসেট" : "Forgot password"}</CardTitle>
        <CardDescription>
          {locale === "bn"
            ? "আপনার ইমেইল দিন, রিসেট লিংক প্রস্তুত করা হবে।"
            : "Enter your email and a reset link will be prepared."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading
              ? locale === "bn"
                ? "অপেক্ষা করুন..."
                : "Please wait..."
              : locale === "bn"
                ? "লিংক পাঠান"
                : "Send reset link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
