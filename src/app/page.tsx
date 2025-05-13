"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Watch Club</h1>
      <p>First rule of Watch Club: Please talk about Watch Club 👉👈</p>

      {status === "loading" && <p>Loading...</p>}

      {status === "unauthenticated" && (
        <div>
          <Link href="/auth/login">Login</Link>
          <br></br>
          <Link href="/auth/register">Create an Account</Link>
        </div>
      )}

      {status === "authenticated" && (
        <div>
          <Link href="/dashboard">Open Watch Club</Link>
        </div>
      )}
    </div>
  );
}
