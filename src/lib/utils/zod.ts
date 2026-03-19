import { ZodError } from "zod";

export function getZodErrorMap(error: ZodError) {
  return error.flatten().fieldErrors;
}
