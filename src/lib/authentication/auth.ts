import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import dbConnect from "../db/dbConnect";
import User from "@/models/User";
import { loginSchema } from "./authSchema";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();

          const validatedCredentials = loginSchema.parse(credentials);

          const user = await User.findOne({
            email: validatedCredentials.email,
          });

          if (!user) {
            console.log("No user found with the provided email.");
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            validatedCredentials.password,
            user.password
          );

          if (!isValidPassword) {
            console.log("Invalid password.");
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
          };
        } catch (error) {
          console.log("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
