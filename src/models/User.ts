import mongoose, { Model, Schema } from "mongoose";
import { BaseDocument } from "@/lib/db/baseDocument";

interface IUser extends BaseDocument {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  sex: "male" | "female";
  birthDate: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sex: { type: String, enum: ["male", "female"], required: true },
    birthDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
