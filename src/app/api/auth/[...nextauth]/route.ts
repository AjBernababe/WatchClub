import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validation/authSchema";
import { validateOrThrow } from "@/lib/utils/validateOrThrow";

interface AuthUser {
  id: string;
  email: string;
  username: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = validateOrThrow(loginSchema, credentials);

          await dbConnect();

          const user = await User.findOne({
            email: email.toLowerCase().trim(),
          });
          if (!user) {
            throw new Error("No user found with this email.");
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid password.");
          }

          const authUser: AuthUser = {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };

          return authUser;
        } catch (err) {
          console.error("Authentication error:", err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
