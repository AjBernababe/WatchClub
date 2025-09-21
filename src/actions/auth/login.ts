"use server";

import { LoginSchema, LoginType } from "@/lib/zodSchema";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import throwRedirectError from "@/utils/throwNextRedirect";
import { FormErrorTypes } from "@/utils/formErrors";

export default async function login(data: LoginType) {
  try {
    const validatedData = LoginSchema.parse(data);

    const email = validatedData.email.toLowerCase();
    const password = validatedData.password;

    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    throwRedirectError(error);

    if (error instanceof AuthError) {
      return FormErrorTypes.INVALID_CREDENTIALS;
    }

    return FormErrorTypes.SOMETHING_WENT_WRONG;
  }
}
