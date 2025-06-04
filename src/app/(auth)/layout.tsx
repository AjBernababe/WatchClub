import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) redirect("/dashboard");

  return (
    <main className="flex items-center justify-center h-screen">
      {children}
    </main>
  );
}
