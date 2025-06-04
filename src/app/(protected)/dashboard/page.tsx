import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  async function handleSignOut() {
    "use server";
    await signOut({
      redirectTo: "/",
    });
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <h3>Welcome {session?.user?.email}</h3>

      <Button onClick={handleSignOut} className="cursor-pointer">
        Sign Out
      </Button>
    </main>
  );
}
