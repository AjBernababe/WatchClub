import mongoose, { Model, Schema } from "mongoose";
import { BaseDocument } from "@/lib/db/baseDocument";

interface IUser extends BaseDocument {
  provider: "google" | "credentials";
  email: string;
  password: string;
  username: string;
  name: string;
  sex: "male" | "female";
  birthDate: Date;
  hasCompletedSetup: boolean;
}

const userSchema = new Schema<IUser>(
  {
    provider: { type: String, enum: ["credentials", "google"], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    birthDate: { type: Date, required: true },
    hasCompletedSetup: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
