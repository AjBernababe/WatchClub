import { UseFormReturn, FieldPath } from "react-hook-form";

type FormErrorType = {
  readonly message: string;
  readonly type: "error" | "success";
  readonly field: string;
};

export const FormErrorTypes = {
  SOMETHING_WENT_WRONG: {
    message: "An unexpected error occurred. Please try again later.",
    type: "error",
    field: "root",
  },
  INVALID_CREDENTIALS: {
    message: "Invalid email or password. Please try again.",
    type: "error",
    field: "root",
  },
  EMAIL_ALREADY_EXISTS: {
    message: "An account with this email already exists.",
    type: "error",
    field: "email",
  },
} as const satisfies Record<string, FormErrorType>;

type FormErrorKey = keyof typeof FormErrorTypes;

export function displayFormError<T extends Record<string, any>>(
  form: UseFormReturn<T>,
  errorType: (typeof FormErrorTypes)[FormErrorKey]
): void {
  if (errorType.field === "root") {
    form.setError("root", {
      message: errorType.message,
      type: errorType.type,
    });
  } else {
    form.setError(errorType.field as FieldPath<T>, {
      message: errorType.message,
      type: errorType.type,
    });
  }
}
