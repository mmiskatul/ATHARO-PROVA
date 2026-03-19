import { z, ZodError } from "zod";
import { ContactMessage } from "@/models";
import { connectToDatabase } from "@/lib/db/mongoose";
import { apiError, apiSuccess } from "@/lib/utils/api";
import { getZodErrorMap } from "@/lib/utils/zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json());
    await connectToDatabase();
    const message = await ContactMessage.create(body);
    return apiSuccess({ id: message._id.toString() }, "Message received.", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError("Validation failed.", 422, getZodErrorMap(error));
    }
    return apiError("Unable to send your message.", 400);
  }
}
