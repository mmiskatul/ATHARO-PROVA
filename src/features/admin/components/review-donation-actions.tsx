"use client";

import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";

export function ReviewDonationActions({ id }: { id: string }) {
  const [loading, setLoading] = useState<"approved" | "rejected" | null>(null);

  async function review(status: "approved" | "rejected") {
    try {
      setLoading(status);
      await apiClient.patch(`/donations/${id}/verify`, { status });
      toast.success(`Donation ${status}.`);
      window.location.reload();
    } catch {
      toast.error("Unable to review donation.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => review("approved")} disabled={loading !== null}>
        {loading === "approved" ? "..." : "Approve"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => review("rejected")}
        disabled={loading !== null}
      >
        {loading === "rejected" ? "..." : "Reject"}
      </Button>
    </div>
  );
}
