import { ZodSchema, ZodError } from "zod";

export function validateOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const flattened = result.error.flatten();
    const message =
      Object.values(flattened.fieldErrors).flat().filter(Boolean).join("; ") ||
      "Validation failed.";

    throw new ZodValidationError(message, flattened);
  }

  return result.data;
}

export class ZodValidationError extends Error {
  constructor(
    public message: string,
    public details: ReturnType<ZodError["flatten"]>
  ) {
    super(message);
    this.name = "ZodValidationError";
  }
}
