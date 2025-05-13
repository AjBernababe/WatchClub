"use client";
import RequireAuth from "@/components/RequireAuth";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const username = session?.user?.username;

  return (
    <RequireAuth>
      <div>
        <h1>Watch Club</h1>
        <p>Welcome {username}</p>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      </div>
    </RequireAuth>
  );
}
