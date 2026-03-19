"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";

export function SaveCampaignButton({
  campaignId,
  locale,
}: {
  campaignId: string;
  locale: "en" | "bn";
}) {
  const [loading, setLoading] = useState(false);

  async function saveCampaign() {
    try {
      setLoading(true);
      await apiClient.post(`/campaigns/${campaignId}/save`);
      toast.success(locale === "bn" ? "সেভ করা হয়েছে।" : "Saved campaigns updated.");
    } catch {
      toast.error(locale === "bn" ? "সেভ করা যায়নি।" : "Unable to save campaign.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={saveCampaign} disabled={loading}>
      <Bookmark className="mr-2 h-4 w-4" />
      {locale === "bn" ? "সেভ করুন" : "Save"}
    </Button>
  );
}
