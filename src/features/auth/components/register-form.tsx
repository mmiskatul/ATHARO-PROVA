"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "@/lib/api/client";
import { registerSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type RegisterValues = z.output<typeof registerSchema>;
type RegisterInput = z.input<typeof registerSchema>;

export function RegisterForm({ locale }: { locale: "en" | "bn" }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterInput, unknown, RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      preferredLanguage: locale,
    },
  });

  async function onSubmit(values: RegisterValues) {
    try {
      setIsLoading(true);
      await apiClient.post("/auth/register", values);
      toast.success(
        locale === "bn"
          ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন লগইন করুন।"
          : "Account created. Sign in to continue.",
      );
      router.push(`/${locale}/login`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create account right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>{locale === "bn" ? "নতুন অ্যাকাউন্ট" : "Create account"}</CardTitle>
        <CardDescription>
          {locale === "bn"
            ? "ডোনেশন, রিসিপ্ট ও আপডেট ট্র্যাক করতে অ্যাকাউন্ট তৈরি করুন।"
            : "Create an account to track donations, receipts, and updates."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">{locale === "bn" ? "নাম" : "Full name"}</Label>
            <Input id="name" {...form.register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{locale === "bn" ? "ফোন" : "Phone"}</Label>
            <Input id="phone" {...form.register("phone")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">{locale === "bn" ? "পাসওয়ার্ড" : "Password"}</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="preferredLanguage">{locale === "bn" ? "পছন্দের ভাষা" : "Preferred language"}</Label>
            <Select id="preferredLanguage" {...form.register("preferredLanguage")}>
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </Select>
          </div>
          <Button className="md:col-span-2" type="submit" disabled={isLoading}>
            {isLoading
              ? locale === "bn"
                ? "তৈরি হচ্ছে..."
                : "Creating..."
              : locale === "bn"
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
