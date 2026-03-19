import { headers } from "next/headers";
import { connectToDatabase } from "@/lib/db/mongoose";
import { AuditLog } from "@/models";

export const AuditService = {
  async record(params: {
    actorUserId: string;
    action: string;
    entityType: string;
    entityId: string;
    details?: Record<string, unknown>;
  }) {
    await connectToDatabase();
    const requestHeaders = await headers();

    return AuditLog.create({
      ...params,
      details: params.details ?? {},
      ipAddress:
        requestHeaders.get("x-forwarded-for") ??
        requestHeaders.get("x-real-ip") ??
        "127.0.0.1",
      userAgent: requestHeaders.get("user-agent") ?? "unknown",
    });
  },
};
