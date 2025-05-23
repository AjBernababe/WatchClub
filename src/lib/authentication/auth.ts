import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: (credentials) => {
        if (credentials.password === "test") {
          return {
            name: "Test User",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
