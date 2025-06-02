"use server";

import { RegisterSchema, RegisterType } from "@/lib/zodSchema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function register(data: RegisterType) {
  try {
    const validatedData = RegisterSchema.parse(data);

    const { email, password } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return {
        message: "User with this email already exists.",
        type: "error",
        field: "email",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return {
      message: "User registered successfully.",
      type: "success",
      field: "root",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Registration failed. Please try again.",
      type: "error",
      field: "root",
    };
  }
}
