import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/connect";
import User from "@/models/User";
import { registerSchema } from "@/lib/validation/authSchema";
import {
  validateOrThrow,
  ZodValidationError,
} from "@/lib/validation/validateOrThrow";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = validateOrThrow(registerSchema, body);

    if (data.secretCode !== process.env.REGISTRATION_SECRET) {
      return NextResponse.json(
        { error: "Invalid registration code." },
        { status: 403 }
      );
    }

    const email = data.email.trim().toLowerCase();
    const username = data.username.trim();
    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();

    await dbConnect();

    const existingEmail = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists." },
        { status: 409 }
      );
    }

    const existingUsername = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      firstName,
      lastName,
      sex: data.sex,
      birthDate: new Date(data.birthDate),
    });

    return NextResponse.json({
      message: "User registered successfully.",
      userId: newUser._id,
    });
  } catch (err) {
    if (err instanceof ZodValidationError) {
      return NextResponse.json(
        { error: err.message, details: err.details },
        { status: 400 }
      );
    }
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
