import { z } from "zod";

//#region Registration schema
export const RegisterSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type RegisterType = z.infer<typeof RegisterSchema>;
//#endregion

//#region Login schema
export const LoginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
export type LoginType = z.infer<typeof LoginSchema>;
//#endregion
