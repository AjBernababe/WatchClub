"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validation/authSchema";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [formError, setFormError] = useState("");

  const onSubmit = async (data: LoginInput) => {
    setFormError("");

    const res = await signIn("credentials", {
      ...data,
      redirect: false, // We handle redirect manually
    });

    if (!res || res.error) {
      setFormError("Invalid email or password.");
    } else {
      router.push("/"); // Redirect to home or dashboard
    }
  };

  return (
    <main className="max-w-md mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {formError && (
        <p className="text-red-600 text-center mb-4">{formError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            {...register("email")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
