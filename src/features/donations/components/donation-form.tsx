"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { apiClient } from "@/lib/api/client";
import { donationSchema } from "@/lib/validators/donation";
import type { PaymentInstruction } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type DonationValues = z.output<typeof donationSchema>;
type DonationInput = z.input<typeof donationSchema>;

export function DonationForm({
  locale,
  paymentInstructions,
  campaignId,
  campaignTitle,
}: {
  locale: "en" | "bn";
  paymentInstructions: PaymentInstruction[];
  campaignId?: string;
  campaignTitle?: string;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<DonationInput, unknown, DonationValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      campaignId: campaignId ?? null,
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      amount: 500 as unknown as DonationInput["amount"],
      publicNameMode: "partial",
      paymentMethod: paymentInstructions[0]?.code ?? "bkash",
      transactionId: "",
      paymentProofUrl: "",
      donorMessage: "",
    },
  });

  const selectedMethod = paymentInstructions.find(
    (method) => method.code === form.watch("paymentMethod"),
  );

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiClient.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      form.setValue("paymentProofUrl", response.data.data.url, { shouldValidate: true });
      toast.success(locale === "bn" ? "স্ক্রিনশট আপলোড হয়েছে।" : "Proof uploaded.");
    } catch {
      toast.error(locale === "bn" ? "ফাইল আপলোড ব্যর্থ হয়েছে।" : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: DonationValues) {
    try {
      setIsSubmitting(true);
      await apiClient.post("/donations", values);
      toast.success(
        locale === "bn"
          ? "ডোনেশন জমা হয়েছে এবং যাচাইয়ের জন্য অপেক্ষা করছে।"
          : "Donation submitted and waiting for verification.",
      );
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to submit your donation.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale === "bn" ? "ডোনেশন জমা দিন" : "Submit your donation"}</CardTitle>
        <CardDescription>
          {campaignTitle
            ? `${locale === "bn" ? "ক্যাম্পেইন" : "Campaign"}: ${campaignTitle}`
            : locale === "bn"
              ? "জেনারেল ফান্ডে ডোনেট করুন।"
              : "Donate to the general fund."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
          <input type="hidden" {...form.register("campaignId")} />
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="donorName">{locale === "bn" ? "দাতার নাম" : "Donor name"}</Label>
            <Input id="donorName" {...form.register("donorName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donorEmail">Email</Label>
            <Input id="donorEmail" type="email" {...form.register("donorEmail")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="donorPhone">{locale === "bn" ? "ফোন" : "Phone"}</Label>
            <Input id="donorPhone" {...form.register("donorPhone")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">{locale === "bn" ? "পরিমাণ (BDT)" : "Amount (BDT)"}</Label>
            <Input id="amount" type="number" min={10} {...form.register("amount")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">{locale === "bn" ? "পেমেন্ট মাধ্যম" : "Payment method"}</Label>
            <Select id="paymentMethod" {...form.register("paymentMethod")}>
              {paymentInstructions.map((method) => (
                <option key={method.code} value={method.code}>
                  {locale === "bn" ? method.labelBn : method.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="publicNameMode">{locale === "bn" ? "পাবলিক নাম" : "Public name mode"}</Label>
            <Select id="publicNameMode" {...form.register("publicNameMode")}>
              <option value="full">{locale === "bn" ? "পূর্ণ নাম" : "Show full name"}</option>
              <option value="partial">{locale === "bn" ? "আংশিক নাম" : "Show partial name"}</option>
              <option value="anonymous">{locale === "bn" ? "বেনামী" : "Anonymous"}</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="transactionId">{locale === "bn" ? "ট্রানজ্যাকশন আইডি" : "Transaction ID"}</Label>
            <Input id="transactionId" {...form.register("transactionId")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proof">{locale === "bn" ? "পেমেন্ট প্রুফ" : "Payment proof"}</Label>
            <label className="flex h-11 cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-white px-4 text-sm">
              <UploadCloud className="h-4 w-4" />
              <span>
                {uploading
                  ? locale === "bn"
                    ? "আপলোড হচ্ছে..."
                    : "Uploading..."
                  : locale === "bn"
                    ? "স্ক্রিনশট আপলোড করুন"
                    : "Upload screenshot"}
              </span>
              <input className="hidden" id="proof" type="file" accept="image/*" onChange={handleUpload} />
            </label>
            <Input readOnly value={form.watch("paymentProofUrl") || ""} placeholder="Uploaded file URL" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>{locale === "bn" ? "পেমেন্ট নির্দেশনা" : "Payment instructions"}</Label>
            <div className="rounded-3xl border border-border bg-muted/50 p-4 text-sm leading-6">
              <p className="font-semibold">
                {locale === "bn" ? selectedMethod?.labelBn : selectedMethod?.label}
              </p>
              <p>{selectedMethod?.accountName}</p>
              <p>{selectedMethod?.accountNumber}</p>
              <p className="mt-2 text-muted-foreground">
                {locale === "bn"
                  ? selectedMethod?.instructionsBn
                  : selectedMethod?.instructions}
              </p>
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="donorMessage">{locale === "bn" ? "বার্তা (ঐচ্ছিক)" : "Message (optional)"}</Label>
            <Textarea id="donorMessage" {...form.register("donorMessage")} />
          </div>
          <Button className="md:col-span-2" disabled={isSubmitting || uploading} type="submit">
            {isSubmitting
              ? locale === "bn"
                ? "জমা হচ্ছে..."
                : "Submitting..."
              : locale === "bn"
                ? "ডোনেশন জমা দিন"
                : "Submit donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
