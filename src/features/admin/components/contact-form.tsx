"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiClient } from "@/lib/api/client";

export function ContactForm({ locale }: { locale: "en" | "bn" }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);
      await apiClient.post("/contact", Object.fromEntries(formData.entries()));
      toast.success(locale === "bn" ? "বার্তা পাঠানো হয়েছে।" : "Message sent.");
    } catch {
      toast.error(locale === "bn" ? "বার্তা পাঠানো যায়নি।" : "Unable to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form className="grid gap-5" action={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{locale === "bn" ? "নাম" : "Name"}</Label>
              <Input id="name" name="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">{locale === "bn" ? "ফোন" : "Phone"}</Label>
              <Input id="phone" name="phone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{locale === "bn" ? "বিষয়" : "Subject"}</Label>
              <Input id="subject" name="subject" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{locale === "bn" ? "বার্তা" : "Message"}</Label>
            <Textarea id="message" name="message" />
          </div>
          <Button type="submit" disabled={loading}>
            {loading
              ? locale === "bn"
                ? "পাঠানো হচ্ছে..."
                : "Sending..."
              : locale === "bn"
                ? "বার্তা পাঠান"
                : "Send message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
