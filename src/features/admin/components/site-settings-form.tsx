"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteSettingSchema } from "@/lib/validators/settings";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type SiteSettingValues = z.output<typeof siteSettingSchema>;
type SiteSettingInput = z.input<typeof siteSettingSchema>;

export function SiteSettingsForm({
  defaultValues,
}: {
  defaultValues: SiteSettingInput;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<SiteSettingInput, unknown, SiteSettingValues>({
    resolver: zodResolver(siteSettingSchema),
    defaultValues,
  });

  async function onSubmit(values: SiteSettingValues) {
    try {
      setIsSaving(true);
      await apiClient.patch("/settings", values);
      toast.success("Settings updated.");
    } catch {
      toast.error("Unable to update settings.");
    } finally {
      setIsSaving(false);
    }
  }

  const paymentMethods = form.watch("paymentInstructions");

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Site identity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site name</Label>
            <Input id="siteName" {...form.register("siteName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteNameBn">Site name (Bangla)</Label>
            <Input id="siteNameBn" {...form.register("siteNameBn")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input id="contactEmail" type="email" {...form.register("contactEmail")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact phone</Label>
            <Input id="contactPhone" {...form.register("contactPhone")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" {...form.register("address")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="addressBn">Address (Bangla)</Label>
            <Textarea id="addressBn" {...form.register("addressBn")} />
          </div>
          <div className="flex items-center gap-3 md:col-span-2">
            <Switch
              checked={Boolean(form.watch("guestDonationEnabled"))}
              onCheckedChange={(checked) =>
                form.setValue("guestDonationEnabled", checked, { shouldDirty: true })
              }
            />
            <span className="text-sm font-medium">Allow guest donations</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Homepage content</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero title</Label>
            <Input id="heroTitle" {...form.register("homepageContent.heroTitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroTitleBn">Hero title (Bangla)</Label>
            <Input id="heroTitleBn" {...form.register("homepageContent.heroTitleBn")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero subtitle</Label>
            <Textarea id="heroSubtitle" {...form.register("homepageContent.heroSubtitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitleBn">Hero subtitle (Bangla)</Label>
            <Textarea id="heroSubtitleBn" {...form.register("homepageContent.heroSubtitleBn")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="missionTitle">Mission title</Label>
            <Input id="missionTitle" {...form.register("homepageContent.missionTitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="missionTitleBn">Mission title (Bangla)</Label>
            <Input id="missionTitleBn" {...form.register("homepageContent.missionTitleBn")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="missionBody">Mission body</Label>
            <Textarea id="missionBody" {...form.register("homepageContent.missionBody")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="missionBodyBn">Mission body (Bangla)</Label>
            <Textarea id="missionBodyBn" {...form.register("homepageContent.missionBodyBn")} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {paymentMethods.map((_, index) => (
            <div key={index} className="grid gap-4 rounded-3xl border border-border p-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input {...form.register(`paymentInstructions.${index}.label`)} />
              </div>
              <div className="space-y-2">
                <Label>Label (Bangla)</Label>
                <Input {...form.register(`paymentInstructions.${index}.labelBn`)} />
              </div>
              <div className="space-y-2">
                <Label>Account name</Label>
                <Input {...form.register(`paymentInstructions.${index}.accountName`)} />
              </div>
              <div className="space-y-2">
                <Label>Account number</Label>
                <Input {...form.register(`paymentInstructions.${index}.accountNumber`)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Instructions</Label>
                <Textarea {...form.register(`paymentInstructions.${index}.instructions`)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Instructions (Bangla)</Label>
                <Textarea {...form.register(`paymentInstructions.${index}.instructionsBn`)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save settings"}
      </Button>
    </form>
  );
}
