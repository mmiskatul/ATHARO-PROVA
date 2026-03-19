import { apiError, apiSuccess } from "@/lib/utils/api";
import { saveUploadedFile } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return apiError("Upload file is required.", 400);
    }

    const uploaded = await saveUploadedFile(file, "proofs");
    return apiSuccess(uploaded, "File uploaded successfully.", 201);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Upload failed.", 400);
  }
}
