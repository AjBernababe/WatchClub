"use server";

import { RegisterSchema, RegisterType } from "@/lib/zodSchema";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { FormErrorTypes } from "@/utils/formErrors";

export default async function register(data: RegisterType) {
  try {
    const validatedData = RegisterSchema.parse(data);

    const email = validatedData.email.toLowerCase();
    const password = validatedData.password;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return FormErrorTypes.EMAIL_ALREADY_EXISTS;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return FormErrorTypes.SOMETHING_WENT_WRONG;
  }
}
