import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export async function saveUploadedFile(file: File, folder = "proofs") {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error("Unsupported file type.");
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("File size exceeds the 5MB limit.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split(".").pop() || "jpg";
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const targetDirectory = path.join(process.cwd(), "public", "uploads", folder);
  const fullPath = path.join(targetDirectory, fileName);
  await fs.mkdir(targetDirectory, { recursive: true });
  await fs.writeFile(fullPath, bytes);

  return {
    url: `/uploads/${folder}/${fileName}`,
    mimeType: file.type,
    size: file.size,
  };
}
