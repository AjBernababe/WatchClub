import { auth, signOut } from "@/lib/authentication/auth"; // or from "next-auth"
import { redirect } from "next/navigation";

// Server action (must be outside JSX)
async function signOutAction() {
  "use server";
  await signOut({ redirect: false });
  redirect("/"); // or "/auth/login"
}

export default async function YourComponent() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{session?.user?.name}</h2>
      <p>Welcome to the dashboard!</p>

      <form action={signOutAction}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
