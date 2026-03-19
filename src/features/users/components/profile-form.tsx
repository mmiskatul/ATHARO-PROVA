"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { apiClient } from "@/lib/api/client";

type ProfileValues = {
  name: string;
  phone: string;
  preferredLanguage: "en" | "bn";
};

export function ProfileForm({
  locale,
  defaultValues,
}: {
  locale: "en" | "bn";
  defaultValues: ProfileValues;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileValues>({ defaultValues });

  async function onSubmit(values: ProfileValues) {
    try {
      setIsLoading(true);
      await apiClient.patch("/profile", values);
      toast.success(locale === "bn" ? "প্রোফাইল আপডেট হয়েছে।" : "Profile updated.");
    } catch {
      toast.error(locale === "bn" ? "আপডেট ব্যর্থ হয়েছে।" : "Update failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale === "bn" ? "প্রোফাইল" : "Profile"}</CardTitle>
        <CardDescription>
          {locale === "bn"
            ? "আপনার প্রোফাইল ও ভাষা পছন্দ আপডেট করুন।"
            : "Update your profile details and language preference."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">{locale === "bn" ? "নাম" : "Name"}</Label>
            <Input id="name" {...form.register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{locale === "bn" ? "ফোন" : "Phone"}</Label>
            <Input id="phone" {...form.register("phone")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">{locale === "bn" ? "ভাষা" : "Language"}</Label>
            <Select id="preferredLanguage" {...form.register("preferredLanguage")}>
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </Select>
          </div>
          <Button type="submit" disabled={isLoading} className="md:col-span-2">
            {isLoading
              ? locale === "bn"
                ? "সংরক্ষণ হচ্ছে..."
                : "Saving..."
              : locale === "bn"
                ? "সংরক্ষণ করুন"
                : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
