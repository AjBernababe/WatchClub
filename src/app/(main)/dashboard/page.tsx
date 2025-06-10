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
    <>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>
  );
}
