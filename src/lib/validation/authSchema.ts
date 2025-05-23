import { z } from "zod";

//#region Registration schema
export const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  secretCode: z.string().min(1, "Secret code is required"),
});
export type RegisterType = z.infer<typeof registerSchema>;
//#endregion

//#region Login schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
export type LoginType = z.infer<typeof loginSchema>;
//#endregion
