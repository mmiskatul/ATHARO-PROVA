import { NextResponse } from "next/server";
import type { ApiError, ApiSuccess } from "@/types";

export function apiSuccess<T>(data: T, message?: string, status = 200) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      success: true,
      data,
      message,
    },
    { status },
  );
}

export function apiError(message: string, status = 400, errors?: Record<string, string[]>) {
  return NextResponse.json<ApiError>(
    {
      success: false,
      message,
      errors,
    },
    { status },
  );
}
