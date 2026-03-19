"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "@/lib/validators/auth";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm({
  locale,
  verified,
}: {
  locale: "en" | "bn";
  verified?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: `/${locale}/dashboard`,
    });

    if (result?.error) {
      toast.error("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    window.location.href = result?.url ?? `/${locale}/dashboard`;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{locale === "bn" ? "লগইন করুন" : "Sign in"}</CardTitle>
        <CardDescription>
          {verified === "success"
            ? locale === "bn"
              ? "ইমেইল যাচাই সম্পন্ন হয়েছে। এখন লগইন করুন।"
              : "Your email is verified. You can sign in now."
            : locale === "bn"
              ? "আপনার অ্যাকাউন্টে প্রবেশ করুন।"
              : "Sign in to manage donations and receipts."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
            <p className="text-xs text-destructive">{form.formState.errors.email?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{locale === "bn" ? "পাসওয়ার্ড" : "Password"}</Label>
            <Input id="password" type="password" {...form.register("password")} />
            <p className="text-xs text-destructive">{form.formState.errors.password?.message}</p>
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading
              ? locale === "bn"
                ? "অপেক্ষা করুন..."
                : "Please wait..."
              : locale === "bn"
                ? "লগইন"
                : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
