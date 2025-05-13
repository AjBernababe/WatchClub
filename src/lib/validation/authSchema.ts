import { z } from "zod";

//#region Registration schema
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(20),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  sex: z.enum(["male", "female"]),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  secretCode: z.string().min(1),
});
export type RegisterInput = z.infer<typeof registerSchema>;
//#endregion

//#region Login schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
export type LoginInput = z.infer<typeof loginSchema>;
//#endregion
