"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand mb-6">
          Welcome to Watch Club
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          First rule of Watch Club: Please talk about Watch Club 👉👈
        </p>

        {status === "loading" && <p className="text-sm">Loading...</p>}

        {status === "unauthenticated" && (
          <div className="flex justify-center gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-full bg-brand text-white hover:opacity-90 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2 rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition"
            >
              Create an Account
            </Link>
          </div>
        )}

        {status === "authenticated" && (
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-2 rounded-full bg-brand text-white hover:opacity-90 transition"
            >
              Open Watch Club
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
