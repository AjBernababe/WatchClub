"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validation/authSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    setFormError("");
    setFormSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        setFormError(result.error || "Registration failed.");
        return;
      }

      setFormSuccess("Registration successful!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setFormError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-12 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {formError && (
        <p className="text-red-600 text-center mb-4">{formError}</p>
      )}
      {formSuccess && (
        <p className="text-green-600 text-center mb-4">{formSuccess}</p>
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

        <div>
          <label>Username</label>
          <input
            {...register("username")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label>First Name</label>
          <input
            {...register("firstName")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            {...register("lastName")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label>Sex</label>
          <select
            {...register("sex")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-red-600 text-sm">{errors.sex.message}</p>
          )}
        </div>

        <div>
          <label>Birth Date</label>
          <input
            type="date"
            {...register("birthDate")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.birthDate && (
            <p className="text-red-600 text-sm">{errors.birthDate.message}</p>
          )}
        </div>

        <div>
          <label>Registration Code</label>
          <input
            {...register("secretCode")}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.secretCode && (
            <p className="text-red-600 text-sm">{errors.secretCode.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
}
