"use server";

import { signIn } from "@/lib/auth";
import { FormErrorTypes } from "@/utils/formErrors";
import throwRedirectError from "@/utils/throwNextRedirect";

export default async function googleSignIn() {
  try {
    await signIn("google");
  } catch (error) {
    throwRedirectError(error);

    return FormErrorTypes.SOMETHING_WENT_WRONG;
  }
}
